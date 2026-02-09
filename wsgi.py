import os
import sys

# Adiciona o diretório atual ao sys.path para importações corretas
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from flask_app.app import app
except ImportError as e:
    print(f"Erro ao importar a aplicação: {e}")
    # Fallback caso o gunicorn não consiga encontrar pela estrutura de pacotes
    from app import app

if __name__ == "__main__":
    app.run()
