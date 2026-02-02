#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
SCRIPT PARA INICIAR A APLICAÇÃO VERISURE
Use isso para deploy simples
"""

import os
import sys

# Adicionar diretório ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask_app.app import app

if __name__ == '__main__':
    print("="*80)
    print("🚀 COMPILADOR VERISURE - Iniciando aplicação")
    print("="*80)
    
    # Detectar porta (Replit/Railway usam PORT)
    port = int(os.getenv("PORT", 5000))
    deploy_url = os.getenv("DEPLOY_URL", f"http://localhost:{port}")
    
    print(f"📍 Acesse: {deploy_url}")
    print(f"🌐 Ambiente: {'Produção' if port != 5000 else 'Desenvolvimento'}")
    print("💾 Arquivos em: flask_app/saidas/")
    print("="*80)
    
    # Rodar em modo de produção (sem debug)
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False,
        use_reloader=False
    )
