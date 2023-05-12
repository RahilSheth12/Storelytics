from datetime import datetime

now = datetime.now()

a = str(now.month) + "/" + str("%d") + "/" + str(now.year)
b = now.strftime("%-I:%M %p")
print(datetime.now().strftime(a + " " + b))
# message_sent_time = now.strftime("%-I:%M %p")
# print(message_sent_time)

# print(a + " " + b)
