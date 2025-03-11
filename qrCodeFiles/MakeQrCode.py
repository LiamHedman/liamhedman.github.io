import qrcode
from PIL import Image, ImageOps


# Data att koda
data = "https://liamhedman.github.io"

# Skapa QR-kod
qr = qrcode.QRCode(
    version=1,  # Version styr storleken på QR-koden
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # Felkorrigering (L, M, Q, H)
    box_size=10,  # Storlek på varje "ruta"
    border=4  # Bredd på vit marginal runt QR-koden
)

qr.add_data(data)
qr.make(fit=True)

# Generera bild
img = qr.make_image(fill="black", back_color="white")

img = img.convert("RGB")

# Byt ut svart till önskad färg (DC8AA1)
img = ImageOps.colorize(img.convert("L"), black="#DC8AA1", white="white")

# Spara eller visa den färgade QR-koden
img.save("qr_code_colored.png")
img.show()
