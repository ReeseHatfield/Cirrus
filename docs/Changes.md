# Version History 

## Release 1.3 January 16, 2024

### Summary:
- Smoother feel
- Alert fixes
- Enhanced Graphics

### Added:
- None

### Changed:
- Old Logo now cleaner
- Login.css now feels more cohesive
  
### Deprecated:
- None

### Removed:
- None

### Issues Fixed:
- [resolves #14](https://github.com/ReeseHatfield/Cirrus/issues/14)
- [resolves #8](https://github.com/ReeseHatfield/Cirrus/issues/8)

## Release 1.2: January 3, 2024

### Summary:
Enhanced build pipeline and better login styling

### Added:
- cirrus.sh
- cirrus.bat
- Modular Unauthorized Modal

### Changed:
- Styling of Login.tsx

### Deprecated
- None

### Removed
- None
- 
### Issues Fixed:
- [resolves #13](https://github.com/ReeseHatfield/Cirrus/issues/13)
- [resolves #15](https://github.com/ReeseHatfield/Cirrus/issues/15)
- [resolves #16](https://github.com/ReeseHatfield/Cirrus/issues/16)
- [resolves #17](https://github.com/ReeseHatfield/Cirrus/issues/17)
- [resolves #18](https://github.com/ReeseHatfield/Cirrus/issues/18)


### Future changes
Hopefully, in 1.3, the alert issue will be fixed. That is the plan as of 1/8


## Release 1.1: January 3, 2024

### Summary:
Cirrus primary database has been ported over to use Redis. Admin CLI rebuilt from ground up with Python

### Added:
- Several new CLI options
- Redis database

### Changed:
- Old Admin console menu options
- authenicateUser endpoint now uses the Redis SDK for node instead of the database.json file

### Deprecated
- Old admin CLI

### Removed
- None
### Issues Fixed:
- [resolves #5](https://github.com/ReeseHatfield/Cirrus/issues/5)
- [resolves #7](https://github.com/ReeseHatfield/Cirrus/issues/7)
- [resolves #9](https://github.com/ReeseHatfield/Cirrus/issues/9)

### Future changes:
- None ATM


## Release 1.0: December 24, 2023

### Summary:
I'm really happy to present the first public release of Cirrus. It supports most core functionality of a cloud file system. If anyone actually wants to use the project and runs into any issues, please let me know and I would be beyond happy to help anyone who actually wants to use something I built.

### Added:
- First public release of Cirrus
- Core functionality

### Changed:
- None

### Deprecated
- None

### Removed
- None

### Issues Fixed:
- None

### Future changes:
- Administrator CLI should run in docker container

