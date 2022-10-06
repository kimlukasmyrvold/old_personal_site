import datetime

d1 = int(21)
m1 = int(5)
y1 = int(2006)

date = datetime.datetime.now()

d2 = int("%s" % (date.day))
m2 = int("%s" % (date.month))
y2 = int("%s" % (date.year))

month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

if (d1 > d2):
  d2 = d2 + month[m2 - 2]
  m2 = m2 - 1
if (m1 > m2):
  m2 = m2 + 12
  y2 = y2 - 1
      
d = d2 - d1
m = m2 - m1
y = y2 - y1

print ("Your birthday: " + str(d1) + "/" + str(m1) + "/" + str(y1))
print ("Today's date: " + ("%s" % (date.day)) + "/" + ("%s" % (date.month)) + "/" + ("%s" % (date.year)))

print ("Your Age is " + str(y) + " Years " + str(m) + " Months " + str(d) + " Days")

print (y)
