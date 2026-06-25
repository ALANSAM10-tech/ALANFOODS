import os
import requests
import logging

logger = logging.getLogger(__name__)

class ZohoInvoiceSync:
    """
    Handles authentication and syncing of orders to Zoho Books/Invoice.
    Uses OAuth 2.0 credentials loaded from environment variables.
    """
    def __init__(self):
        self.client_id = os.getenv('ZOHO_CLIENT_ID')
        self.client_secret = os.getenv('ZOHO_CLIENT_SECRET')
        self.refresh_token = os.getenv('ZOHO_REFRESH_TOKEN')
        self.organization_id = os.getenv('ZOHO_ORGANIZATION_ID')
        self.api_url = "https://www.zohoapis.com/invoice/v3"
        self.auth_url = "https://accounts.zoho.com/oauth/v2/token"

    def get_access_token(self):
        if not all([self.client_id, self.client_secret, self.refresh_token]):
            logger.warning("Zoho credentials missing. Operating in Sandbox/Mock mode.")
            return None

        payload = {
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'redirect_uri': 'http://localhost/',
            'grant_type': 'refresh_token'
        }
        
        try:
            response = requests.post(self.auth_url, data=payload, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('access_token')
        except Exception as e:
            logger.error(f"Failed to retrieve access token from Zoho: {e}")
            return None

    def sync_order_as_invoice(self, order):
        """
        Creates a Zoho Invoice for a completed order.
        """
        logger.info(f"Syncing order {order.id} to Zoho Invoice...")

        access_token = self.get_access_token()
        
        # If credentials are not present, return a mock invoice ID
        if not access_token:
            mock_id = f"ZOHO-INV-{order.id}"
            logger.info(f"Mock Zoho sync successful. Generated Invoice ID: {mock_id}")
            return mock_id

        headers = {
            'Authorization': f'Zoho-oauthtoken {access_token}',
            'X-com-zoho-invoice-organizationid': self.organization_id,
            'Content-Type': 'application/json'
        }

        # Build Zoho invoice payload
        invoice_data = {
            'customer_id': '', # Can be fetched or created dynamically based on customer email
            'invoice_number': f"INV-{order.id}",
            'date': order.created_at.strftime('%Y-%m-%d'),
            'line_items': []
        }

        for item in order.items.all():
            invoice_data['line_items'].append({
                'name': f"{item.variant.product.name} ({item.variant.weight})",
                'rate': float(item.price_at_purchase),
                'quantity': item.quantity
            })

        try:
            response = requests.post(
                f"{self.api_url}/invoices",
                json=invoice_data,
                headers=headers,
                timeout=15
            )
            response.raise_for_status()
            result = response.json()
            if result.get('code') == 0:
                invoice_id = result.get('invoice', {}).get('invoice_id')
                logger.info(f"Successfully synced Invoice {invoice_id} to Zoho.")
                return invoice_id
            else:
                logger.error(f"Zoho API returned error code: {result.get('message')}")
                return None
        except Exception as e:
            logger.error(f"Error occurred while syncing invoice to Zoho: {e}")
            return None
