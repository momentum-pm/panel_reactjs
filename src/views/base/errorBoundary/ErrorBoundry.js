import React, { Component } from "react";
import { withRouter } from "react-router";
import BugReporter from "../../../utils/requests/BugReporter";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, hasChunkLoadError: false };
  }

  componentDidCatch(error, info) {
    let message = "";
    if (error && error.message) {
      message = error.message;
    }
    message = message.toLowerCase();
    if (
      message.indexOf("loading") >= 0 &&
      message.indexOf("chunk") >= 0 &&
      message.indexOf("failed") >= 0
    ) {
      this.setState({ hasChunkLoadError: true });
    } else {
      this.setState({ hasError: true });
      let location = this.props.location.pathname;
      BugReporter.reportReactjsError(error, info, location);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.renderError(
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "80px",
            height: "80px",
            "text-align": "center",
            margin: "32px auto 0",
            display: "table",
          }}
        >
          <path
            d="m479.301 331.015c12.474-5.84 15.263-22.348 5.4-31.962l-27.444-26.748c-11.228-10.943-28.06-13.787-42.26-7.14l-59.77 27.981 16.85 35.995 50.74-23.753c4.473-2.094 9.772-1.247 13.369 2.137l21.255 19.996c5.883 5.533 14.546 6.918 21.86 3.494z"
            fill="#5f6c75"
          />
          <path
            d="m355.227 293.146 16.85 35.995 46.775-21.897v-43.602c-1.3.442-2.591.932-3.855 1.524z"
            fill="#4e5a61"
          />
          <path
            d="m32.699 331.015c-12.474-5.84-15.263-22.348-5.4-31.962l27.444-26.748c11.228-10.943 28.06-13.787 42.26-7.14l59.77 27.981-16.85 35.995-50.74-23.753c-4.473-2.094-9.772-1.247-13.369 2.137l-21.255 19.996c-5.883 5.533-14.546 6.918-21.86 3.494z"
            fill="#5f6c75"
          />
          <path
            d="m156.773 293.146-59.77-27.981c-1.264-.592-2.555-1.082-3.855-1.524v43.602l46.774 21.897z"
            fill="#4e5a61"
          />
          <path
            d="m363.656 418.395h56.025c4.939 0 9.379 3.014 11.202 7.604l26.334 66.303c2.925 7.364 10.046 12.198 17.969 12.198 13.513 0 22.858-13.508 18.093-26.153l-28.381-75.311c-5.529-14.671-19.568-24.384-35.247-24.384h-65.995z"
            fill="#5f6c75"
          />
          <path
            d="m148.344 418.395h-56.025c-4.939 0-9.379 3.014-11.202 7.604l-26.334 66.303c-2.925 7.364-10.046 12.198-17.969 12.198-13.513 0-22.858-13.508-18.093-26.153l28.381-75.311c5.529-14.671 19.568-24.384 35.247-24.384h65.995z"
            fill="#5f6c75"
          />
          <path
            d="m418.852 378.652h-55.197v39.744h51.512c2.402-9.754 3.685-19.943 3.685-30.427z"
            fill="#4e5a61"
          />
          <path
            d="m148.344 378.652h-55.196v9.317c0 10.484 1.283 20.673 3.685 30.427h51.511z"
            fill="#4e5a61"
          />
          <path
            d="m439.984 113.683-12.286 30.932c-1.823 4.59-6.263 7.604-11.202 7.604h-99.699v39.744h109.669c15.679 0 29.718-9.712 35.247-24.384l14.96-39.698c4.848-12.865-4.659-26.608-18.408-26.608-8.06 0-15.305 4.918-18.281 12.41z"
            fill="#5f6c75"
          />
          <path
            d="m316.798 191.963h102.011c-.375-14.968-5.659-28.73-14.308-39.744h-87.704v39.744z"
            fill="#4e5a61"
          />
          <path
            d="m72.016 113.683 12.286 30.932c1.823 4.59 6.263 7.604 11.202 7.604h99.699v39.744h-109.67c-15.679 0-29.718-9.712-35.247-24.384l-14.96-39.698c-4.848-12.865 4.659-26.608 18.408-26.608 8.061 0 15.306 4.918 18.282 12.41z"
            fill="#5f6c75"
          />
          <path
            d="m195.202 152.22h-87.704c-8.649 11.013-13.932 24.775-14.307 39.744h102.011z"
            fill="#4e5a61"
          />
          <path
            d="m324.585 158.899h-137.17v-33.253c0-36.697 29.749-66.446 66.446-66.446h4.278c36.697 0 66.446 29.749 66.446 66.446z"
            fill="#acd980"
          />
          <path
            d="m210.454 158.899v-31.114c0-33.951 24.675-62.122 57.066-67.603-3.748-.634-7.592-.982-11.52-.982-.002 0-.004 0-.006 0h-2.133c-36.697 0-66.446 29.749-66.446 66.446v33.253z"
            fill="#8cc951"
          />
          <path
            d="m294.735 489.445h-77.471c-54.296 0-98.312-44.016-98.312-98.312v-198.758c0-22.174 17.976-40.15 40.15-40.15h193.795c22.174 0 40.15 17.976 40.15 40.15v198.758c0 54.296-44.016 98.312-98.312 98.312z"
            fill="#7dc03a"
          />
          <path
            d="m144.197 391.133v-198.758c0-22.174 17.976-40.15 40.15-40.15h-25.244c-22.174 0-40.15 17.976-40.15 40.15v198.758c0 54.296 44.016 98.312 98.312 98.312h25.244c-54.296 0-98.312-44.016-98.312-98.312z"
            fill="#6ea734"
          />
          <path
            d="m343.718 372.231-81.653-144.16c-2.67-4.713-9.46-4.713-12.129 0l-81.653 144.16c-2.632 4.646.725 10.405 6.065 10.405h163.306c5.339 0 8.695-5.758 6.064-10.405z"
            fill="#f5de46"
          />
          <path
            d="m187.305 372.231 78.206-138.075-3.447-6.085c-2.67-4.713-9.46-4.713-12.129 0l-81.653 144.16c-2.632 4.647.725 10.405 6.065 10.405h19.023c-5.34 0-8.697-5.758-6.065-10.405z"
            fill="#ecc52e"
          />
          <path d="m500.297 475.702-12.969-34.414c-1.461-3.875-5.786-5.833-9.663-4.373-3.876 1.46-5.834 5.787-4.373 9.663l12.969 34.414c1.39 3.689.901 7.665-1.342 10.907s-5.791 5.101-9.733 5.101c-4.88 0-9.198-2.931-11-7.466l-26.334-66.303c-2.976-7.494-10.109-12.335-18.172-12.335h-20.992c1.215-6.405 1.858-13.009 1.858-19.762v-4.981h29.103c12.483 0 23.827 7.848 28.229 19.528l3.358 8.911c1.461 3.875 5.787 5.834 9.663 4.373 3.876-1.46 5.834-5.787 4.374-9.663l-3.358-8.911c-6.59-17.488-23.576-29.238-42.265-29.238h-29.103v-47.058l25.45-11.914c1.7-.797 3.684-.479 5.051.807l21.255 19.996c5.179 4.872 11.833 7.417 18.599 7.417 3.91 0 7.858-.85 11.58-2.592 8.088-3.786 13.804-11.304 15.292-20.109s-1.442-17.783-7.837-24.016l-27.443-26.749c-13.384-13.044-33.749-16.485-50.675-8.561l-11.27 5.276v-64.186h25.919c18.689 0 35.674-11.75 42.265-29.238l14.961-39.698c3.145-8.345 1.993-17.706-3.081-25.04s-13.427-11.713-22.345-11.713c-11.205 0-21.117 6.729-25.252 17.142l-12.285 30.932c-.693 1.745-2.354 2.873-4.232 2.873l-84.412.005v-19.079c0-20.549-8.432-39.161-22.01-52.575l10.377-6.549c8.756-5.525 13.983-15.005 13.983-25.359v-33.665c0-4.142-3.358-7.5-7.5-7.5-4.143 0-7.5 3.358-7.5 7.5v33.664c0 5.174-2.613 9.912-6.989 12.673l-14.807 9.344c-11.437-7.258-24.981-11.482-39.5-11.482h-4.278c-14.52 0-28.064 4.223-39.501 11.482l-14.807-9.344c-4.376-2.761-6.989-7.499-6.989-12.673v-33.664c0-4.142-3.357-7.5-7.5-7.5-4.142 0-7.5 3.358-7.5 7.5v33.664c0 10.354 5.228 19.833 13.983 25.359l10.377 6.548c-13.578 13.414-22.01 32.026-22.01 52.575v19.074h-84.413c-1.877 0-3.539-1.127-4.232-2.873l-12.285-30.932c-4.136-10.413-14.048-17.142-25.252-17.142-8.918 0-17.271 4.378-22.345 11.713-5.074 7.334-6.226 16.695-3.081 25.041l2.145 5.69c1.46 3.875 5.788 5.834 9.663 4.373 3.876-1.46 5.834-5.787 4.373-9.663l-2.144-5.69c-1.43-3.794-.927-7.883 1.38-11.217s5.955-5.247 10.009-5.247c5.019 0 9.459 3.014 11.312 7.679l12.286 30.932c2.977 7.494 10.109 12.335 18.172 12.335h28.946c-6.33 6.714-10.735 15.255-12.328 24.743h-26.589c-12.482 0-23.826-7.848-28.229-19.528l-1.639-4.351c-1.46-3.876-5.787-5.834-9.663-4.374s-5.834 5.787-4.374 9.663l1.64 4.351c6.591 17.488 23.576 29.238 42.265 29.238h25.92v64.186l-11.271-5.276c-16.927-7.925-37.291-4.484-50.675 8.561l-27.443 26.749c-6.395 6.233-9.325 15.21-7.837 24.016s7.204 16.323 15.292 20.109c3.722 1.743 7.668 2.593 11.58 2.592 6.765 0 13.421-2.545 18.599-7.417l21.255-19.996c1.368-1.286 3.351-1.603 5.05-.808l25.451 11.915v47.058h-29.104c-18.689 0-35.675 11.75-42.265 29.238l-28.381 75.312c-3.106 8.242-1.969 17.487 3.042 24.73 5.01 7.246 13.26 11.57 22.068 11.57 11.066 0 20.855-6.645 24.94-16.929l26.334-66.303c.693-1.745 2.354-2.873 4.231-2.873h25.006c14.414 41.32 53.767 71.05 99.939 71.05h77.471c46.172 0 85.525-29.73 99.939-71.05h25.006c1.877 0 3.539 1.127 4.231 2.873l26.334 66.303c4.086 10.284 13.875 16.929 24.941 16.929 8.808 0 17.058-4.324 22.069-11.568 5.011-7.243 6.148-16.488 3.042-24.73zm-82.12-203.744c11.305-5.292 24.907-2.995 33.846 5.718l27.444 26.749c2.912 2.838 4.194 6.766 3.516 10.775-.677 4.01-3.178 7.299-6.861 9.023-4.56 2.134-9.874 1.284-13.541-2.165l-21.254-19.996c-3.722-3.501-8.504-5.331-13.366-5.331-2.81 0-5.647.611-8.322 1.863l-19.09 8.937v-27.321zm16.492-124.574 12.286-30.932c1.853-4.665 6.292-7.679 11.312-7.679 4.054 0 7.703 1.912 10.009 5.247 2.307 3.334 2.81 7.423 1.38 11.217l-14.96 39.698c-4.402 11.681-15.746 19.528-28.229 19.528h-26.588c-1.593-9.488-5.998-18.029-12.328-24.743h28.946c8.063 0 15.195-4.842 18.172-12.336zm-180.808-80.684h4.278c32.503 0 58.946 26.443 58.946 58.946v19.079h-122.17v-19.079c0-32.503 26.443-58.946 58.946-58.946zm-161.5 231.894c-7.303-3.417-15.815-2.057-21.688 3.468l-21.255 19.996c-3.666 3.449-8.98 4.299-13.54 2.165-3.683-1.724-6.184-5.013-6.861-9.023-.678-4.009.604-7.937 3.517-10.775l27.443-26.749c5.734-5.588 13.386-8.538 21.119-8.538 4.323 0 8.673.922 12.727 2.819l17.63 8.253v27.321zm-.042 112.301c-8.062 0-15.196 4.842-18.172 12.335l-26.333 66.303c-1.802 4.536-6.119 7.466-11 7.466-3.942 0-7.49-1.859-9.733-5.102s-2.732-7.218-1.342-10.907l28.381-75.312c4.402-11.678 15.747-19.526 28.23-19.526h29.104v4.981c0 6.753.643 13.357 1.858 19.762zm293.228-19.762c0 50.074-40.738 90.812-90.812 90.812h-31.235v-65.697c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v65.697h-31.235c-50.074 0-90.812-40.738-90.812-90.812v-198.758c0-18.003 14.646-32.65 32.649-32.65h89.398v35.551c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-35.551h89.397c18.003 0 32.65 14.646 32.65 32.65z" />
          <path d="m268.591 224.375c-2.564-4.526-7.388-7.338-12.59-7.338-5.202 0-10.026 2.812-12.591 7.338l-81.652 144.16c-2.566 4.53-2.533 9.92.089 14.418s7.295 7.184 12.501 7.184h163.306c5.207 0 9.879-2.686 12.501-7.184s2.655-9.888.089-14.418zm-93.335 150.761 80.744-142.554 80.744 142.555h-161.488z" />
          <path d="m248.5 285.056v33.785c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-33.785c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5z" />
          <path d="m256 338.279c-4.142 0-7.5 3.358-7.5 7.5v3.011c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-3.011c0-4.142-3.358-7.5-7.5-7.5z" />
        </svg>,
        "خطا",
        "مشکلی در نمایش این صفحه رخ داده است. لطفا دوباره تلاش کنید."
      );
    }
    if (this.state.hasChunkLoadError) {
      return this.renderError(
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "80px",
            height: "80px",
            "text-align": "center",
            margin: "32px auto 0",
            display: "table",
          }}
        >
          <g fill="#ffe55a">
            <path d="m142.116 241.121c8.959-8.155 19.628-19.972 31.959-32.271-4.46-7.794-9.006-14.346-13.175-17.89-10.363-8.81-26.361-11.612-36.703-12.482-5.666-.477-10.512 4.04-10.434 9.726.142 10.378 1.814 26.534 9.875 37.489 3.466 4.709 10.329 10.09 18.478 15.428z" />
            <path d="m191.56 192.396c10.819-9.473 22.647-18.353 35.456-25.116-3.164-9.994-6.764-18.754-10.634-23.615-8.472-10.641-23.631-16.471-33.612-19.317-5.468-1.559-11.093 1.94-12.112 7.534-1.859 10.211-3.33 26.386 2.47 38.689 2.874 6.096 10.003 13.936 18.432 21.825z" />
            <path d="m274.151 154.7c8.136 0 15.875.93 23.232 2.629 2.861-10.832 4.66-20.9 3.9-27.426-1.573-13.51-11.366-26.468-18.338-34.156-3.819-4.212-10.444-4.212-14.264 0-6.972 7.688-16.764 20.646-18.338 34.156-.752 6.458 1.002 16.384 3.81 27.087 6.466-1.473 13.13-2.29 19.998-2.29z" />
            <path d="m356.742 192.396c8.429-7.889 15.557-15.729 18.432-21.825 5.8-12.303 4.329-28.478 2.47-38.689-1.018-5.594-6.644-9.093-12.111-7.534-9.981 2.846-25.141 8.676-33.612 19.317-3.73 4.685-7.21 12.991-10.289 22.534 13.2 6.71 24.868 15.878 35.11 26.197z" />
            <path d="m398.736 251.597c11.048-5.433 20.898-11.275 25.637-16.595 9.047-10.156 12.217-26.086 13.326-36.406.608-5.653-3.796-10.602-9.482-10.656-10.379-.097-26.569 1.202-37.707 9.007-4.601 3.224-9.893 9.569-15.2 17.177 9.498 12.763 17.257 25.882 23.426 37.473z" />
            <path d="m437.686 316.541c9.872-4.454 18.586-9.262 22.975-13.805 8.809-9.117 12.363-23.832 13.785-33.401.779-5.242-3.135-10.017-8.428-10.282-9.662-.483-24.788.116-35.456 6.965-4.775 3.065-10.444 9.511-16.117 17.172 6.283 12.202 13.52 24.043 23.241 33.351z" />
          </g>
          <path
            d="m408.166 270.409c-17.316-36.377-58.726-115.709-134.015-115.709s-126.486 97.325-150.579 97.325-33.128-32.576-62.104-31.823c-28.977.753-53.953 23.828-53.953 55.45 0 19.427 25.656 27.053 62.328 25.052 33.056-1.804 73.407 24.609 73.407 53.44v42.075c0 12.764 10.347 23.111 23.111 23.111 12.764 0 23.111-10.347 23.111-23.111v-30.917h111.987c4.191 4.923 10.1 9.103 18.366 11.765v18.632c0 12.957 10.603 23.872 23.557 23.627 12.557-.238 22.664-10.492 22.664-23.106v-17.144l19.535-27.117c69.683 36.596 102.648 15.778 116.898-2.22 4.935-6.233.081-15.331-7.844-14.701-52.026 4.131-70.79-31.695-86.469-64.629z"
            fill="#98db7c"
          />
          <path
            d="m171.443 383.346v35.415c10.278-2.308 17.967-11.458 18.024-22.419v-31.02c-9.954 0-18.024 8.07-18.024 18.024z"
            fill="#82d361"
          />
          <path
            d="m348.021 397.024v21.742c10.315-2.317 18.023-11.53 18.024-22.545v-17.221c-9.955 0-18.024 8.07-18.024 18.024z"
            fill="#82d361"
          />
          <path
            d="m256.116 169.047c75.29 0 116.699 79.332 134.016 115.709 17.166 36.06 49.664 74.892 114.037 61.629 1.504-5.683-2.953-11.871-9.536-11.348-52.024 4.132-70.788-31.693-86.466-64.628-17.317-36.377-58.727-115.709-134.016-115.709-32.005 0-59.654 17.589-82.72 37.81 19.038-13.522 40.63-23.463 64.685-23.463z"
            fill="#82d361"
          />
          <path
            d="m43.433 234.549c28.977-.753 38.011 31.823 62.104 31.823 6.16 0 14.096-6.37 23.75-15.842-2.047.962-3.956 1.495-5.715 1.495-24.093 0-33.127-32.576-62.104-31.823-16.389.426-31.494 7.996-41.528 20.211 7.17-3.579 15.164-5.648 23.493-5.864z"
            fill="#82d361"
          />
          <path
            d="m437.686 316.541c6.368-2.873 12.247-5.894 16.801-8.896-8.979-12.205-15.914-26.24-22.393-39.849-.326-.685-.66-1.383-1.001-2.094-.176.108-.359.204-.532.315-4.775 3.065-10.444 9.511-16.117 17.172 6.284 12.203 13.521 24.044 23.242 33.352z"
            fill="#ffd91d"
          />
          <path
            d="m418.139 240.41c-7.523-13.633-16.85-28.687-28.144-43.082-4.479 3.325-9.574 9.471-14.685 16.798 9.498 12.761 17.257 25.88 23.426 37.471 7.4-3.639 14.254-7.46 19.403-11.187z"
            fill="#ffd91d"
          />
          <path
            d="m371.526 176.465c-12.079-11.989-25.85-22.564-41.436-30.179-3.04 4.855-5.889 11.949-8.459 19.912 13.201 6.71 24.869 15.879 35.111 26.198 5.909-5.53 11.171-11.033 14.784-15.931z"
            fill="#ffd91d"
          />
          <path
            d="m277.007 133.894c-9.189 0-18.065 1.265-26.63 3.507.503 5.652 1.903 12.444 3.778 19.589 6.464-1.472 13.129-2.289 19.996-2.289 8.136 0 15.875.93 23.232 2.628 2.035-7.704 3.527-15.015 3.948-20.947-7.745-1.609-15.847-2.488-24.324-2.488z"
            fill="#ffd91d"
          />
          <path
            d="m191.56 192.396c10.819-9.473 22.647-18.353 35.456-25.117-2.115-6.681-4.426-12.803-6.881-17.585-14.823 8.146-28.489 18.693-40.968 29.82 3.382 4.083 7.683 8.475 12.393 12.882z"
            fill="#ffd91d"
          />
          <path
            d="m127.951 230.405c3.687 3.443 8.627 7.089 14.165 10.716 8.959-8.155 19.628-19.972 31.959-32.271-3.422-5.979-6.893-11.221-10.206-14.941-13.7 13.49-25.689 26.689-35.918 36.496z"
            fill="#ffd91d"
          />
          <path d="m43.958 257.649c0 9.643 5.717 16.914 13.298 16.914 7.582 0 13.299-7.271 13.299-16.914 0-9.642-5.717-16.914-13.299-16.914-7.581 0-13.298 7.271-13.298 16.914z" />
          <path d="m510.006 336.275c-3.157-5.916-9.27-9.257-15.968-8.73-18.133 1.442-31.683-2.186-42.538-9.41 6.616-3.566 11.426-6.929 14.565-10.178 10.002-10.351 14.12-26.116 15.813-37.517 1.414-9.494-5.906-18.414-15.486-18.892-11.513-.575-27.781.37-39.891 8.146-3.187 2.046-6.674 5.218-10.539 9.594-.337-.702-.675-1.401-1.012-2.111-1.808-3.798-3.83-7.948-6.066-12.339 10.105-5.405 17.046-10.288 21.1-14.839 10.173-11.421 13.873-28.383 15.185-40.601 1.066-9.921-6.911-18.879-16.883-18.972-12.292-.117-29.564 1.59-42.09 10.367-3.362 2.356-7.003 5.972-11.021 10.95-2.16-2.656-4.378-5.285-6.691-7.857-.389-.432-.781-.85-1.171-1.277 6.025-6.066 10.321-11.278 13.037-15.819 2.13-3.562.97-8.176-2.592-10.306-3.559-2.128-8.175-.971-10.306 2.591-1.494 2.498-4.544 6.62-10.728 12.865-8.338-7.716-16.987-14.158-25.926-19.314 3.01-8.226 5.413-12.292 7-14.285 7.417-9.315 21.85-14.506 29.794-16.771 1.188-.337 2.436.44 2.657 1.653.644 3.538 1.091 7.025 1.328 10.364.294 4.14 3.863 7.262 8.029 6.963 4.139-.294 7.256-3.888 6.963-8.028-.276-3.882-.792-7.915-1.533-11.99-1.786-9.806-11.966-16.153-21.565-13.414-11.818 3.369-27.904 9.897-37.43 21.863-3.011 3.782-5.904 9.354-8.773 16.912-3.571-1.501-7.184-2.81-10.837-3.923 2.204-9.832 2.962-17.379 2.314-22.94-1.769-15.192-11.98-29.232-20.234-38.334-6.699-7.39-18.697-7.392-25.396 0-8.255 9.102-18.466 23.143-20.235 38.334-.64 5.49.091 12.912 2.228 22.552-4.705 1.426-9.292 3.161-13.76 5.157-2.972-7.987-5.969-13.839-9.089-17.758-9.527-11.965-25.614-18.493-37.43-21.862-9.6-2.737-19.779 3.606-21.566 13.414-2.201 12.09-3.456 29.405 3.066 43.24 2.404 5.097 7.085 11.154 14.22 18.393-1.697 1.569-3.368 3.144-5.013 4.721-3.467-5.192-6.695-9.04-9.771-11.655-11.653-9.906-28.695-13.214-40.94-14.245-9.941-.834-18.715 7.342-18.578 17.316.167 12.287 2.271 29.52 11.336 41.84 2.579 3.505 6.583 7.294 12.134 11.475-2.533 1.805-4.66 2.888-6.148 2.888-8.502 0-15.106-6.004-22.754-12.956-9.97-9.064-21.29-19.333-39.545-18.864-34.356.897-61.27 28.553-61.27 62.966 0 7.471 2.891 14.158 8.361 19.336 13.697 12.97 41.22 14.345 61.892 13.219 8.844-.481 18.63 1.311 28.291 5.189 3.85 1.546 8.228-.322 9.773-4.174 1.546-3.852-.323-8.227-4.174-9.773-11.683-4.689-23.681-6.852-34.709-6.248-24.69 1.348-43.191-1.978-50.739-9.125-2.501-2.368-3.665-5.044-3.665-8.424 0-26.202 20.484-47.259 46.633-47.938 12.278-.312 20.03 6.762 29.047 14.96 8.695 7.905 18.551 16.865 32.863 16.865 11.899 0 23.873-12.425 41.998-31.234 26.878-27.892 63.688-66.091 108.581-66.091 30.28 0 58.259 14.038 83.161 41.724 20.735 23.055 35.082 50.821 44.07 69.7 8.569 18.002 17.404 35.251 31.2 48.42 16.559 15.808 37.059 22.503 62.646 20.469 1.36-.104 2.214 1.464 1.358 2.546-7.248 9.154-16.748 15.18-28.235 17.91-3.934.935-6.46 4.958-5.605 8.907.879 4.058 5.041 6.672 9.079 5.715 14.643-3.48 27.28-11.503 36.543-23.203 4.168-5.264 4.795-12.21 1.637-18.127zm-330.081-168.909c-5.078-10.771-3.354-26.012-1.875-34.138.221-1.213 1.47-1.992 2.658-1.654 7.944 2.265 22.377 7.455 29.794 16.771 1.667 2.093 4.202 6.435 7.382 15.347-9.224 5.395-17.897 11.755-26.03 18.531-7.571-7.598-10.685-12.219-11.929-14.857zm-38.591 64.13c-6.949-4.939-10.166-8.249-11.643-10.257-7.059-9.591-8.301-24.879-8.415-33.138-.016-1.23 1.061-2.241 2.291-2.135 8.231.693 23.393 3.006 32.466 10.719 1.754 1.491 4.569 4.59 8.597 11.008-7.784 7.915-15.329 16.071-23.296 23.803zm118.433-83.233c-2.119-9.573-2.278-14.752-1.959-17.491 1.378-11.828 10.892-23.859 16.442-29.978.828-.914 2.3-.913 3.129 0 5.549 6.119 15.063 18.15 16.441 29.978.323 2.775.153 8.043-2.032 17.816-10.578-1.694-21.418-1.912-32.021-.325zm135.056 54.84c9.751-6.834 25.033-7.716 33.324-7.647 1.232.012 2.213 1.112 2.081 2.339-.883 8.213-3.545 23.318-11.465 32.21-2.051 2.303-6.671 6.075-16.945 11.571-4.937-8.84-10.669-18.196-17.234-27.446 4.957-6.593 8.254-9.636 10.239-11.027zm28.536 80.794c5.599-7.109 9.172-10.213 11.262-11.555 9.221-5.919 23.395-6.162 31.022-5.783.849.042 1.496.831 1.37 1.672-1.122 7.553-4.142 21.403-11.756 29.284-1.599 1.655-5.717 5-15.926 9.962-5.997-6.662-11.136-14.665-15.972-23.58z" />
          <path d="m441.141 363.76c-15.395-2.186-32.913-8.395-52.068-18.454-3.311-1.739-7.403-.777-9.591 2.261l-19.535 27.117c-.922 1.279-1.418 2.815-1.418 4.392v17.144c0 8.438-6.86 15.433-15.292 15.593-8.734.143-15.901-7.512-15.901-16.114v-18.632c0-3.263-2.106-6.153-5.211-7.153-6.284-2.023-11.313-5.214-14.947-9.483-.017-.02-.037-.037-.055-.057-.144-.165-.292-.328-.453-.483-9.756-9.4-11.004-30.632-10.662-38.02.199-4.141-2.995-7.66-7.137-7.864-4.169-.192-7.67 2.992-7.874 7.137-.051 1.051-.876 20.454 6.437 36.643h-97.965c-4.151 0-7.514 3.364-7.514 7.514v30.917c0 8.599-6.997 15.596-15.596 15.596s-15.596-6.996-15.596-15.596v-42.075c0-12.942-6.691-26.227-18.842-37.405-3.055-2.809-7.809-2.612-10.618.443-2.81 3.054-2.611 7.807.442 10.617 9.021 8.299 13.989 17.655 13.989 26.345v42.075c0 16.886 13.738 30.625 30.625 30.625s30.625-13.738 30.625-30.625v-23.403h101.202c3.938 3.901 8.665 7.06 14.122 9.44v13.443c0 12.977 8.443 25.136 20.716 29.457 3.361 1.183 6.937 1.755 10.499 1.683 16.561-.314 30.035-14.05 30.035-30.619v-14.719l14.35-19.919c18.461 9.127 35.634 14.861 51.118 17.059 4.111.58 7.914-2.274 8.497-6.383.584-4.11-2.274-7.914-6.382-8.497z" />
        </svg>,
        "عدم اتصال",
        "لطفا اتصال به اینترنت را بررسی کنید و دوباره تلاش کنید."
      );
    }
    return this.props.children;
  }

  renderError(image, title, message) {
    return (
      <div
        style={{
          direction: "rtl",
          "font-family": "Azarmehr",
          height: "100%",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "#4790ff",
        }}
      >
        <div
          style={{
            "text-align": "center",
          }}
        >
          {image}
          <h1
            style={{
              color: "white",
              "text-align": "center",
              "font-size": "20px",
              margin: "8px 8px 0",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "white",
              "text-align": "center",
              "font-size": "12px",
              margin: "0 8px 8px",
            }}
          >
            {message}
          </p>
          <button
            style={{
              color: "white",
              background: "transparent",
              outline: "none",
              border: "1px solid white",
              height: "40px",
              width: "140px",
              display: "table",
              margin: "8px auto",
              "border-radius": "20px",
              cursor: "pointer",
              "text-align": "center",
              "font-size": "14px",
              "font-family": "Azarmehr",
            }}
            onClick={() => window.location.reload()}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ErrorBoundary);
