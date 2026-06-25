import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_api.settings')
django.setup()

from core.models import Product, ProductVariant

def seed():
    print("Seeding Alan Foods Database...")
    
    # Clear existing
    Product.objects.all().delete()
    
    products_data = [
        {
            "name": "Whole Malabar Pepper",
            "category": "SPICES",
            "description": "Ethically sourced whole black peppercorns from Wayanad, Kerala, rich in volatile oils.",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
            "variants": [
                {"weight": "250g", "price": 8.99, "stock": 120, "sku": "SPICE-PEP-250"},
                {"weight": "500g", "price": 15.99, "stock": 85, "sku": "SPICE-PEP-500"},
                {"weight": "1kg", "price": 28.99, "stock": 40, "sku": "SPICE-PEP-1K"}
            ]
        },
        {
            "name": "Green Cardamom Pods",
            "category": "SPICES",
            "description": "Vibrant green cardamom pods from the Cardamom Hills in Idukki, Kerala. Intense floral aroma.",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE",
            "variants": [
                {"weight": "250g", "price": 12.99, "stock": 4, "sku": "SPICE-CAR-250"},
                {"weight": "500g", "price": 22.99, "stock": 12, "sku": "SPICE-CAR-500"},
                {"weight": "1kg", "price": 42.99, "stock": 0, "sku": "SPICE-CAR-1K"}
            ]
        },
        {
            "name": "Premium Roasted Almonds",
            "category": "NUTS",
            "description": "California grade-A almonds, dry-roasted and lightly salted to preserve absolute crunch.",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
            "variants": [
                {"weight": "250g", "price": 9.99, "stock": 240, "sku": "NUT-ALM-250"},
                {"weight": "500g", "price": 17.99, "stock": 110, "sku": "NUT-ALM-500"},
                {"weight": "1kg", "price": 32.99, "stock": 95, "sku": "NUT-ALM-1K"}
            ]
        },
        {
            "name": "Artisanal Cashew Nuts",
            "category": "NUTS",
            "description": "Premium large W180 size cashews, buttery, rich, and raw. Perfect for baking or healthy snacking.",
            "image_url": "https://lh3.googleusercontent.com/aida/AP1WRLsF4OpWDZ19gsKGTbeyKyoKwcMoDljzPa2EngO4cq2TgxrB7Ek2dQuyNr0D9gHqPWIUhc6SFj_0ueOS_tAHmmILwunxeoGr6pmyl_PgH10cVSmBqJVGTaQIhudLLHNZJSOf8AoEvVV3IrlVM_TuSKQ6-LNjJ3gfJEo1iJ56MsulJRwl0Fr9RBlWJCo44SpL3vVjpgDWyUCwFKf9YpauBJGGySUXBsyS2RnabzH4Zx1bPXxe3PKCtcfp",
            "variants": [
                {"weight": "250g", "price": 10.99, "stock": 150, "sku": "NUT-CAS-250"},
                {"weight": "500g", "price": 19.99, "stock": 90, "sku": "NUT-CAS-500"},
                {"weight": "1kg", "price": 36.99, "stock": 45, "sku": "NUT-CAS-1K"}
            ]
        },
        {
            "name": "Mediterranean Sun-Dried Apricots",
            "category": "DRY_FRUITS",
            "description": "Naturally sun-dried sweet apricots packed with vitamins and loaded with fiber.",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB",
            "variants": [
                {"weight": "250g", "price": 7.99, "stock": 180, "sku": "FRUIT-APR-250"},
                {"weight": "500g", "price": 14.99, "stock": 95, "sku": "FRUIT-APR-500"},
                {"weight": "1kg", "price": 26.99, "stock": 30, "sku": "FRUIT-APR-1K"}
            ]
        },
        {
            "name": "Premium Medjool Dates",
            "category": "DRY_FRUITS",
            "description": "Plump, organic Medjool dates with a rich, caramel-like texture and sweet natural flavor.",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
            "variants": [
                {"weight": "250g", "price": 11.99, "stock": 140, "sku": "FRUIT-DAT-250"},
                {"weight": "500g", "price": 21.99, "stock": 75, "sku": "FRUIT-DAT-500"},
                {"weight": "1kg", "price": 39.99, "stock": 25, "sku": "FRUIT-DAT-1K"}
            ]
        }
    ]

    for p_data in products_data:
        variants = p_data.pop("variants")
        product = Product.objects.create(**p_data)
        for v_data in variants:
            ProductVariant.objects.create(product=product, **v_data)
        print(f"Created Product: {product.name} with {len(variants)} weight variants.")

    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed()
