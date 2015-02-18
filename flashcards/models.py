from flask.ext.mongokit import MongoKit, Document
from pymongo import TEXT
from datetime import datetime
from app import db
from bson import ObjectId

class BaseDocument(Document):
    def serialize(self):
        response = dict(self)
        for k,v in response.iteritems():
            if isinstance(v, ObjectId):
                response[k] = str(v)
        if hasattr(self, 'entries'):
            response[u'entries'] = self.entries
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

    @property
    def entries(self):
        return db.Entry.find({"dictionary_id":self._id}).count()

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

