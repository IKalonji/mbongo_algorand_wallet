<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/IKalonji/mbongo_algorand_wallet">
    <img src="images/mbongo_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Mbongo Algo Wallet</h3>

  <p align="center">
    An awesome P2P payments and escrow wallet!
    <br />
    <a href="https://github.com/IKalonji/mbongo_algorand_wallet/blob/main/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=T4ouxpaDafk">View Demo</a>
    ·
    <a href="https://github.com/IKalonji/mbongo_algorand_wallet/issues">Report Bug</a>
    ·
    <a href="https://github.com/IKalonji/mbongo_algorand_wallet/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/IKalonji/mbongo_algorand_wallet/blob/main/README.md)

Mbongo is a micro P2P custodial payment wallet that enables Africans to inter-transact digitaly by using a simple top up voucher. Currently 90% of Afiranc relay on cash and only 70% have acive Bank acounts. Making it increasingly difficult to move money around.

Here's why:
* Mbongo, is secure and payments are immediate and seamless, using the virtual currency. 
* The escrow payment option provides a secure enviroment for payments when paying for future goods or services
* Immediate access to all your Mbongo contacts.

Mbongo eliminates the need for a bank accounts, and the use of cash in the Market place as well as daily use of cash.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Tatum](https://tatum.io/)
* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [Python](https://www.python.org/)
* [Android Studio](https://developer.android.com/studio)
* [Ngrok](https://ngrok.com/)
* [Algorand](https://www.algorand.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Notice

1. This project is not audited and should not be used in a production environment.
2. The project was build on Windows and has not been tested on any Linux distro, but it should run since the tools used are cross platform. 

<!-- GETTING STARTED -->
## Getting Started

Follow the steps below on how to run the project.

### Prerequisites

Please install the below required software in order to run the project.

* NodeJs
  [NodeJS](https://nodejs.org/about/releases)

* npm
  ```sh
  npm install npm@latest -g
  ```

* angular
  ```sh
  npm install -g @angular/cli
  ```

* ionic
  ```sh
    npm install -g @ionic/cli
  ```

* Install Python Python
  [Python](https://www.python.org/)

* Install Android Studio
  [Android Studio](https://developer.android.com/studio)

* Physical Android device (access to camera will be required)

### Installation

1. Get a free Tatum API Key at [Tatum](https://tatum.io/)
2. Clone the repo
   ```sh
   git clone https://github.com/IKalonji/mbongo_algorand_wallet.git
   ```
3. cd into the project and run the below command to install the requied Python modules
   ```sh
   cd mbongo-algo-wallet
   pip install -r requirements.txt
   ```
4. cd into the Backend folder and run the server. (KEEP THE SERVER RUNNING)
   ```sh
   cd FlaskBackend
   python app.py
   ```
5. Take note of the Tunnel URL in the terminal output, we'll use that for our server endpoint. Example:
  ```sh
  * Tunnel URL: http://3d5d-197-184-183-154.ngrok.io -(COPY THIS)
  * Serving Flask app 'app' (lazy loading)
  * Environment: production
    WARNING: This is a development server. Do not use it in a production deployment.
    Use a production WSGI server instead.
  * Debug mode: off
  * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
  ```
6. cd into the Ionic frontend install dependecies then paste your Tunnel URL as well as the Tatum API key in the environment.ts as well as the enviroment.prod.ts files, Example:
  ```sh
  cd ..
  cd IonicFrontend
  npm install
  ```
  Then enter the details into the environment.ts as well as the enviroment.prod.ts file, Example.
  ```ts
  export const environment = {
  production: false,
  urlLocal: "ENTER_URL_HERE",
  urlDeployed: "ENTER_URL_HERE",
  API_KEY: "ENTER_API_KEY_HERE"
  };
  ```
7. Now, we can build the frontend with Ionic and create an APK with Android Studio. In the terminal run:
  ```sh
  ionic capacitor build android
  ```

  Android Studio should open automatically once the build is complete. If not open the Ionic/Frontendandroid folder in Android Studio.

8. Finally, use one of the two options to run the app:
  * Option 1:
    In Android Studio, click on the build tab in the navigation bar and select 'Generate APK'. Complete the steps and navigate to the folder where the APK was generated. Send the APK to your Android device and install. 
  * Option 2:
    Connect an Android device to your PC and select your device under the devices section of the navigation bar, then run the app.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

[Video Demo](https://www.youtube.com/watch?v=T4ouxpaDafk)

<iframe width="1016" height="530" src="https://www.youtube.com/embed/T4ouxpaDafk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Please refer to the [Documentation](https://github.com/IKalonji/mbongo_algorand_wallet/blob/main/README.md)_

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Add Card payments
- [ ] Add Voucher provider
- [ ] Add App security
- [ ] Add backend hosting
- [ ] Multi-language Support
    - [ ] Swahili
    - [ ] Zulu
    - [ ] Lingala

See the [open issues](https://github.com/IKalonji/mbongo_algorand_wallet/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Issa Kalonji - [@ISSDawg](https://twitter.com/ISSDawg) - ikalonji@student.wethinkcode.co.za

Project Link: [https://github.com/IKalonji/mbongo_algorand_wallet](https://github.com/IKalonji/mbongo_algorand_wallet)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Tatum](https://tatum.io)
* [Algorand](https://www.algorand.com/)
* [Gitcoin](https://gitcoin.co/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/IKalonji/mbongo_algorand_wallet.svg?style=for-the-badge
[contributors-url]: https://github.com/IKalonji/mbongo_algorand_wallet/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/IKalonji/mbongo_algorand_wallet.svg?style=for-the-badge
[forks-url]: https://github.com/IKalonji/mbongo_algorand_wallet/network/members
[stars-shield]: https://img.shields.io/github/stars/IKalonji/mbongo_algorand_wallet.svg?style=for-the-badge
[stars-url]: https://github.com/IKalonji/mbongo_algorand_wallet/stargazers
[issues-shield]: https://img.shields.io/github/issues/IKalonji/mbongo_algorand_wallet.svg?style=for-the-badge
[issues-url]: https://github.com/IKalonji/mbongo_algorand_wallet/issues
[license-shield]: https://img.shields.io/github/license/IKalonji/mbongo_algorand_wallet.svg?style=for-the-badge
[license-url]: https://github.com/IKalonji/mbongo_algorand_wallet/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/issa-kalonji-b301851ba/
[product-screenshot]: images/screenshot1.png
