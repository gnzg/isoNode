#!/bin/bash

# convert the first parameter to an integer
export INT=$(expr $1 + 0)

# throw an error if no parameter is supplied
if [ "$#" -ne 1 ]; then
  echo 'Please supply a valid port value, e.g. PORT=1337'
  exit 1
elif [ $INT -gt 999 ]; then
  exit 1
else
  echo $1 'A value between 1000 and 9999 is advisable.'
fi