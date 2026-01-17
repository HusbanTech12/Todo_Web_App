import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logger(name: str, log_file: str = None, level: int = logging.INFO):
    """Function to setup as many loggers as you want"""

    formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')

    if log_file:
        # Create logs directory if it doesn't exist
        os.makedirs('logs', exist_ok=True)
        handler = RotatingFileHandler(log_file, maxBytes=1000000, backupCount=5)
        handler.setFormatter(formatter)
    else:
        handler = logging.StreamHandler()
        handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger

# Create a default logger for the application
app_logger = setup_logger('todo_backend', 'logs/app.log')