# Developer Services template project
** TODO **Put project introduction here. 1-2 sentence about the project.
## How to use the template
1. Create your sw projects under "projects/" folder.
2. Check .gitignore file and modify it if it is necessary
3. Check the [./Dockerfile](./Dockerfile) and extend it if necessary
4. Make sure that the whole project can be compiled with a single "make all" command.  
   also implement "make clean"
5. Fill out the [CODEOWNERS](./.github/CODEOWNERS) file. Here is the official github [guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
6. Update and extend if needed the [sonar project file](./.github/sonar-project.properties) .
7. **Internal projects only** Add a self-hosted runner with "devs-self-hosted-runner" name. [guide](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners)
8. Secrets, add your sonarqube token and for  **public repositores** add github personal access token.
9. Check the workflow and adjust them according to the repo types (internal of public)
10. Update this Readme file and rempve this list from it.

## Table of Contents
- [Developer Services template project](#developer-services-template-project)
  - [How to use the template](#how-to-use-the-template)
  - [Table of Contents](#table-of-contents)
  - [Hardware requirements](#hardware-requirements)
  - [Hardware Setup](#hardware-setup)
  - [Build environment setup](#build-environment-setup)
    - [Docker](#docker)
    - [Windows](#windows)
    - [Linux](#linux)
    - [MacOS](#macos)
  - [Debug environment](#debug-environment)
  - [Contributing](#contributing)
  - [License](#license)
  - [Secrets](#secrets)

## Hardware requirements
** TODO ** List the required hw components.

## Hardware Setup
** TODO ** Create a block diagram about the components.

## Build environment setup
** TODO ** Add steps here how to create a build environment. Remove the not supported platforms.
### Docker
Using Docker for the build environment has several advantages:
- **Consistency**: Ensures the build environment is the same across all development machines.
- **Isolation**: Keeps the build environment isolated from the host machine, avoiding conflicts.
- **Portability**: Allows the build environment to be easily shared and reproduced.
- **Scalability**: Simplifies scaling the build process across multiple machines.

To set up the Docker-based build environment, follow these steps:
1. Install Docker on your machine. Only Linux and MacOS platforms are supported for now.
2. Clone the repository.
3. Build the Docker image using the provided [Dockerfile](./.github/Dockerfile).
4. Run the Docker container with the necessary configurations.

### Windows
** TODO ** With a numbered list define the process how to set up a development environment.

### Linux
** TODO ** With a numbered list define the process how to set up a development environment.

### MacOS
** TODO ** With a numbered list define the process how to set up a development environment.

## Debug environment
**TODO**
Explain how can a developer debug this software project. Pictures are recommended.
## Contributing
Please follow the [CONTRIBUTING](./.github/CONTRIBUTING) guideline-

## License
See the [LICENSE.md](./LICENSE.md) file for details.

## Secrets
The following secrets are required for this project:
- `PERSONAL_ACCESS_TOKEN`: Needed for the CLA signature automation workflow **only for public projects**
- `SONAR_TOKEN`: Token to access Sonarqube servers
