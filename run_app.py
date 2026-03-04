#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
SCRIPT PARA INICIAR A APLICAÇÃO VERISURE
Use isso para deploy simples.
Logs do servidor também são gravados em flask_app/logs/app.log (abra esse arquivo para ver as mensagens).
"""

import os
import sys
from datetime import datetime

# Diretório raiz do projeto (onde está run_app.py e .env)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ROOT_DIR)

# Pasta de logs (para você abrir no editor e ver as mensagens do localhost)
LOGS_DIR = os.path.join(ROOT_DIR, "flask_app", "logs")
LOG_FILE = os.path.join(LOGS_DIR, "app.log")


class Tee:
    """Escreve no terminal e no arquivo de log ao mesmo tempo."""
    def __init__(self, stream, path):
        self.stream = stream
        self.path = path
        self._file = None

    def __enter__(self):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        self._file = open(self.path, "a", encoding="utf-8")
        return self

    def __exit__(self, *args):
        if self._file:
            self._file.close()

    def write(self, data):
        if self.stream:
            try:
                self.stream.write(data)
                self.stream.flush()
            except Exception:
                pass
        if self._file:
            try:
                self._file.write(data)
                self._file.flush()
            except Exception:
                pass

    def flush(self):
        if self.stream:
            self.stream.flush()
        if self._file:
            self._file.flush()


# Carregar .env ANTES de importar o app (para OAUTH_CLIENT_ID, DEPLOY_URL, etc.)
try:
    from dotenv import load_dotenv
    env_path = os.path.join(ROOT_DIR, ".env")
    if load_dotenv(env_path):
        print("[ENV] .env carregado de:", env_path, flush=True)
    else:
        print("[ENV] Arquivo .env nao encontrado em:", env_path, flush=True)
except ImportError:
    pass

from flask_app.app import app

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    deploy_url = os.getenv("DEPLOY_URL", f"http://localhost:{port}")

    # Em ambiente de deploy (ex: Render) pode não ser possível criar pasta de logs; não falhar
    try:
        with Tee(sys.stdout, LOG_FILE) as tee:
            sys.stdout = tee
            print("")
            print("=" * 80)
            print("🚀 COMPILADOR VERISURE - Iniciando aplicação")
            print("=" * 80)
            print(f"📍 Acesse: {deploy_url}")
            print(f"📄 Logs também em: {LOG_FILE}")
            print(f"💾 Arquivos em: flask_app/saidas/")
            print("=" * 80)
            app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)
    except Exception as e:
        print(f"[START] Log em arquivo indisponível ({e}), iniciando sem ele.", flush=True)
        print("=" * 80)
        print("🚀 COMPILADOR VERISURE - Iniciando aplicação")
        print("=" * 80)
        print(f"📍 Acesse: {deploy_url}")
        print("=" * 80)
        app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)
