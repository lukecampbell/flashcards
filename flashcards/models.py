from flask.ext.mongokit import MongoKit, Document
from datetime import datetime
from app import db
from bson import ObjectId

class BaseDocument(Document):
    def serialize(self):
        response = dict(self)
        for k,v in response.iteritems():
            if isinstance(v, ObjectId):
                response[k] = str(v)
        return response

@db.register
class Dictionary(BaseDocument):
    __collection__ = 'dictionaries'
    structure = {
        'name' : unicode,
        'display' : unicode,
        'author' : unicode
    }
    use_dot_notation = True

@db.register
class Entry(BaseDocument):
    __collection__ = 'entries'
    structure = {
        'dictionary_id' : ObjectId,
        'title' : unicode,
        'english' : unicode,
        'yomi' : unicode,
        'examples': [
            [unicode, unicode]
        ]
    }
    use_dot_notation = True

