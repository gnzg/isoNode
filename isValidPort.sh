#!/bin/bash

export INT=$(expr $1 + 0)
if [ $INT -gt 999 ]; then
  exit 1
else
  echo $1 'is an invalid port value. A value between 1000 and 9999 is advisable.'
fi