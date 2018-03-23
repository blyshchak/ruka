from flask import Flask
from flask import request

import time
#import atexit

# Importiere die Adafruit PCA9685 Bibliothek
import Adafruit_PCA9685

# Initialise the PCA9685 using the default address (0x40).
PCA9685_pwm = Adafruit_PCA9685.PCA9685()

# Alternatively specify a different address and/or bus:
#pwm = Adafruit_PCA9685.PCA9685(address=0x41, busnum=2)

# Set frequency to 100hz, good for l298n h-bridge.
PCA9685_pwm.set_pwm_freq(60)

# Configure min and max servo pulse lengths
servo_min = 150  # Min pulse length out of 4096
servo_max = 600  # Max pulse length out of 4096

app = Flask(__name__)

@app.route("/")
def web_interface():
  html = open("index.html")
  response = html.read().replace('\n', '')
  html.close()
  return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8181, debug=True)
