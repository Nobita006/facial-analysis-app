import pathlib
import platform
from fastai.vision.all import load_learner
from pathlib import Path

# Detect platform and adjust path handling if necessary
plt = platform.system()
if plt != 'Windows':
    pathlib.WindowsPath = pathlib.PosixPath  # Reverse the mapping to PosixPath for Unix systems

# Load the model using fastai's load_learner
def load_model():
    model_path = Path('export.pkl')  # Make sure export.pkl is in the correct directory
    learn = load_learner(model_path)
    return learn

# Use the model in your application
learner = load_model()

# You can then save the model if needed
learner.export('export_fixed.pkl')
