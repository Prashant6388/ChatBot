import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False
    # MYSQL_HOST = "localhost"
    # MYSQL_USER = "root"
    # MYSQL_PASSWORD = "pass1234"
    # MYSQL_DB = "recommendation"
    # MYSQL_PORT = 3306
    NEO4J_URI = "bolt://localhost:7687"
    NEO4J_USER = "neo4j"
    NEO4J_PASSWORD = "pass1234"
    RECOMMENDATION_URL = "http://141.99.248.98:4000/get-explained-recommendation"
    IMAGES_PATH = basedir+"\\resources\\images"
    DOCS_PATH = basedir+"\\resources\\docs"
    GPT_MODEL = "gpt-3.5-turbo"
    # GPT_MODEL = "gpt-4"
    OPENAI_KEY = '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'
    ALLOWED_FILE_TYPES = ["png","jpeg","jpg","gif","pdf","docx"]
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))