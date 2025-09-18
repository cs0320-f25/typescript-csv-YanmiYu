import { parseCSV } from "./basic-parser";
import { z } from 'zod';
/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();


// Example of using a Zod schema with parseCSV
const PersonSchema = z.array(z.string()).transform((arr) => {
  // Skip validation for header row
  if (arr[0] === "name" && arr[1] === "age") {
    return { name: "", age: 0, isHeader: true };
  }
  return {
    name: arr[0],
    age: parseInt(arr[1]),
    isHeader: false
  };
}).pipe(
  z.object({
    name: z.string(),
    age: z.number(),
    isHeader: z.boolean()
  })
);

// Create a type from the schema
type Person = z.infer<typeof PersonSchema>;

async function mainWithSchema() {
  try {
    // Pass the schema as the second argument to parseCSV
    const people = await parseCSV<Person>(DATA_FILE, PersonSchema);
    const typedPeople = people as Person[];
    
    // Now 'people' is an array of Person objects with proper types
    // Filter out the header row
    for (const person of typedPeople) {
      if (!person.isHeader) {
        console.log(`${person.name} is ${person.age} years old`);
      }
    }
  } catch (error) {
    console.error("Error parsing CSV with schema:", error);
  }
}

// Uncomment to run with schema validation
mainWithSchema();