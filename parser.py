import csv
import json

def toJson(path):
  with open(path, mode='r') as csv_file:
      csv_reader = csv.DictReader(csv_file)
      arr = []
      for row in csv_reader:
          obj = {
            "stateId":row["state"], 
            "trumpChance":row['winstate_inc'],
            "bidenChance":row['winstate_chal']
          }
          print(obj)
          arr.append(obj)
  return arr

data = toJson('./election-forecasts-2020/presidential_state_toplines_2020.csv')

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)