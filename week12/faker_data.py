from faker import Faker
import pandas as pd
from tqdm import tqdm

num_rows = 1000000
tqdm.pandas()

fake = Faker()
# Fname, Minit, Lname, Ssn, Sex, Salary, Dno
student_data = [(fake.first_name(), fake.pystr(max_chars=1).upper(), fake.last_name(), fake.pyint(min_value=100000000, max_value=999999999), 
            fake.random_element(elements=('M', 'F')), fake.pyint(min_value=10000, max_value=99999), fake.pyint(min_value=1, max_value=9)) 
            for _ in tqdm(range(num_rows), desc="Generating Data")]

df = pd.DataFrame(student_data, columns=['Fname', 'Minit', 'Lname', 'Ssn', 'Sex', 'Salary', 'Dno'])
df.to_csv('student_data.csv', index=False)
print("done!")

