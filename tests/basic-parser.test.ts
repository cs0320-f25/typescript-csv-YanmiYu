import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV handles quoted fields with commas", async () => {
  // Create a temporary test file with quoted fields
  const testFilePath = path.join(__dirname, "../data/test-quoted.csv");
  // const testData = 'name,quote\nCaesar,"veni, vidi, vici"\n';
  const results = await parseCSV(testFilePath);
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["name", "quote"]);
  expect(results[1]).toEqual(["Caesar", "veni, vidi, vici"]);
});

test("parseCSV handles empty fields", async () => {
  // Create a temporary test file with empty fields
  const testFilePath = path.join(__dirname, "../data/test-empty.csv");
  // const testData = 'col1,col2,col3\ndata1,,data3\n,data2,\n';
  
  const results = await parseCSV(testFilePath);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["col1", "col2", "col3"]);
  expect(results[1]).toEqual(["data1", "", "data3"]);
  expect(results[2]).toEqual(["", "data2", ""]);
});


test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});
