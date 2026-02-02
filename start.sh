#!/bin/bash
set -e

echo "📦 Instalando dependências..."
pip install -r requirements.txt

echo "🚀 Iniciando aplicação..."
python3 run_app.py
