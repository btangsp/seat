# This app records all the audio samples you have added 
# into the web app to use for subjective audio evaluation

import glob
import json
import ntpath # for extracting filename from path
import os # for removing extension from filename

path = "./client/public/user-studies/test-abx/audio/X/"

pathList = glob.glob(path + "*")

fileList = [ntpath.basename(path) for path in pathList]

data = {}
data['filenames'] = []

for file in fileList:
	base = os.path.splitext(file)[0]
	data['filenames'].append({
		'reference': file,
		'baseline': base + '_baseline.wav',
		'experimental': base + '_experimental.wav',
		'times_selected': 0
	})

with open('./client/src/json/abx.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Inserted %i file group(s) in abx.json" %len(data['filenames']))
