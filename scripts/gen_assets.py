#!/usr/bin/python

import os
import base64
import string
from glob import glob

DIR = os.getcwd() + '/assets/'
EXTS = ['.png', '.ttf']
FILES = [y for x in os.walk(DIR) for y in glob(os.path.join(x[0], '*.ttf'))] + [y for x in os.walk(DIR) for y in glob(os.path.join(x[0], '*.png'))]

print "'use strict';"
print
print 'export default {'

# for fname in os.listdir(DIR):
for fname in FILES:
    if any(fname.endswith(ext) for ext in EXTS):
        with open(fname, 'rb') as f:
            enc = base64.b64encode(f.read())
            if fname.endswith('.ttf') :
                print "    ['{0}']: 'data:font/truetype;charset=utf-8;base64,{1}',".format(fname.replace(DIR, ''), enc)
            else:
                print "    ['{0}']: 'data:image/png;base64,{1}',".format(fname.replace(DIR, ''), enc)

print '};'
