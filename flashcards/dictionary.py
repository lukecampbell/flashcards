#!/usr/bin/env python
'''
flashcards/dictionary.py
'''

import cjson as json
import codecs
import os

from config import DICTIONARY_PATH

class Dictionary:
    def __init__(self, dict_name):
        with codecs.open(os.path.join(DICTIONARY_PATH, dict_name + '.json'), encoding='utf-8') as f:
            buf = f.read()
        pydict = json.decode(buf)

        self.author = pydict['author']
        self.table = pydict['contents']




