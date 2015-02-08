#!/usr/bin/env python
'''
manage.py

Management script
'''

from flask.ext.script import Shell, Manager
from app import app, db

manager = Manager(app)

def make_shell_context():
    ctx = {'db' : db }
    return ctx

manager.add_command('shell', Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()
