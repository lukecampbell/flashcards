from app import app, db
import glob
import codecs
import json

def main():
    db.Dictionary.collection.drop()
    db.Entry.collection.drop()
    for json_file in glob.glob('dicts/*.json'):
        print json_file.split('/')[-1].split('.')[0]
        with codecs.open(json_file, encoding='utf-8') as f:
            buf = f.read()
            data = json.loads(buf)
        load_dictionary(json_file.split('/')[-1].split('.')[0], data)
    
def load_dictionary(dictionary_name, json_data):
    dictionary = db.Dictionary()
    dictionary.name = unicode(dictionary_name)
    dictionary.display = json_data['display']
    dictionary.author = json_data['author']
    dictionary.save()

    for comment_name, content in json_data['contents'].iteritems():
        comment = db.Entry()
        comment.title = comment_name
        comment.english = content['english']
        comment.yomi = content['yomi']
        comment.examples = content['examples']
        comment.dictionary_id = dictionary._id
        comment.save()

if __name__ == '__main__':
    with app.app_context():
        main()
