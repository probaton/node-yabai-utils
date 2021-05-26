#!/usr/bin/env node
import executeInstructions from './executeInstructions';

executeInstructions(process.argv[2])
  .then(res => console.log(res))
  .catch(e => console.error(e.message));
