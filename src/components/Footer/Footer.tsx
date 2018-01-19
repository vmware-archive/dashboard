import * as React from "react";
import logo from "../../logo.svg";

class Footer extends React.Component {
  public render() {
    return (
      <footer className="OSFooter bg-dark type-color-reverse-anchor-reset">
        <div className="container padding-h-big padding-v-big">
          <div className="row collapse-b-phone-land align-center">
            <div className="col-6">
              <h4 className="inverse margin-reset">
                <img src={logo} alt="Kubeapps logo" className="OSFooter__Logo" />
              </h4>
              <p className="type-color-iron type-small margin-reset">
                With &#x2665; from{" "}
                <a href="https://bitnami.com" target="_blank">
                  Bitnami
                </a>
              </p>
            </div>
            <div className="col-6 text-r">
              <a href="#" className="SocialIcon SocialIcon--white margin-h-small">
                <svg
                  role="img"
                  aria-label="See the Github Profile of Bitnami"
                  viewBox="0 0 30 29"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>github</title>
                  <path
                    d="M27.734 7.402a14.803 14.803 0 0 0-5.41-5.408C20.046.664 17.561 0 14.864 0S9.68.664 7.403 1.994a14.8 14.8 0 0 0-5.409 5.408C.664 9.68 0 12.167 0 14.864c0 3.238.946 6.15 2.835 8.737 1.89 2.587 4.332 4.377 7.326 5.37.348.065.607.02.773-.134a.756.756 0 0 0 .252-.582l-.01-1.044a162.6 162.6 0 0 1-.01-1.723l-.444.078a5.604 5.604 0 0 1-1.074.067 8.08 8.08 0 0 1-1.345-.136 2.995 2.995 0 0 1-1.297-.579c-.4-.303-.683-.7-.852-1.19l-.193-.446a4.826 4.826 0 0 0-.61-.987c-.278-.36-.558-.606-.841-.736l-.136-.096a1.46 1.46 0 0 1-.252-.233 1.021 1.021 0 0 1-.173-.27c-.039-.09-.008-.165.096-.223.103-.059.29-.087.561-.087l.388.058c.257.051.577.207.958.464.38.259.693.594.938 1.007.297.529.654.932 1.074 1.21.42.277.842.415 1.268.415.425 0 .793-.033 1.103-.096.31-.065.6-.161.871-.29.116-.865.432-1.53.948-1.994a13.221 13.221 0 0 1-1.984-.349 7.841 7.841 0 0 1-1.819-.755 5.21 5.21 0 0 1-1.558-1.296c-.412-.516-.752-1.194-1.015-2.032-.265-.84-.397-1.807-.397-2.903 0-1.561.51-2.89 1.53-3.988-.48-1.173-.434-2.489.135-3.947.373-.117.928-.028 1.664.261.735.29 1.273.54 1.615.745.343.206.617.381.823.523 1.2-.335 2.439-.503 3.716-.503 1.277 0 2.516.168 3.716.503l.736-.465c.502-.31 1.096-.593 1.78-.852.683-.257 1.206-.327 1.568-.212.58 1.458.632 2.774.155 3.948 1.019 1.097 1.528 2.426 1.528 3.987 0 1.096-.132 2.067-.397 2.913-.264.845-.605 1.522-1.025 2.032-.42.51-.942.938-1.568 1.287-.625.348-1.232.6-1.819.754a13.21 13.21 0 0 1-1.983.349c.67.581 1.005 1.496 1.005 2.748v4.083c0 .232.082.427.243.58.161.155.415.201.764.136 2.994-.994 5.435-2.783 7.325-5.371 1.89-2.587 2.835-5.499 2.835-8.737 0-2.696-.665-5.183-1.993-7.46"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="SocialIcon SocialIcon--white margin-h-small">
                <svg
                  role="img"
                  aria-label="See the Facebook Profile of Bitnami"
                  viewBox="0 0 31 31"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>facebook</title>
                  <path
                    d="M15.36 0C6.877 0 0 6.877 0 15.36s6.877 15.36 15.36 15.36 15.36-6.877 15.36-15.36S23.843 0 15.36 0zm3.638 10.614H16.69c-.274 0-.578.36-.578.839v1.667H19l-.437 2.378h-2.451v7.137h-2.725v-7.137h-2.472V13.12h2.472v-1.398c0-2.007 1.392-3.637 3.303-3.637h2.308v2.53z"
                    fill-rule="nonzero"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" className="SocialIcon SocialIcon--white margin-h-small">
                <svg
                  role="img"
                  aria-label="See the Google Profile of Bitnami"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>google</title>
                  <path
                    d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm-.922 22.868c-1.005.489-2.086.54-2.505.54h-.125-.09c-.653 0-3.905-.15-3.905-3.111 0-2.91 3.542-3.139 4.627-3.139h.028c-.626-.836-.496-1.68-.496-1.68a3.899 3.899 0 0 1-.234.007c-.408 0-1.196-.065-1.873-.502-.83-.533-1.25-1.441-1.25-2.698 0-3.552 3.878-3.695 3.917-3.698h3.873v.085c0 .433-.778.518-1.308.59-.18.026-.542.061-.644.113.982.525 1.14 1.348 1.14 2.575 0 1.397-.546 2.135-1.126 2.653-.36.322-.642.574-.642.912 0 .332.387.67.837 1.065.735.648 1.743 1.53 1.743 3.018 0 1.539-.662 2.639-1.967 3.27zM23.5 16H21v2.5h-1.667V16h-2.5v-1.667h2.5v-2.5H21v2.5h2.5V16zm-10.462 1.917c-.086 0-.173.003-.261.01-.74.055-1.424.331-1.917.781-.49.444-.74 1.004-.705 1.569.075 1.185 1.347 1.878 2.892 1.768 1.52-.11 2.533-.987 2.46-2.172-.07-1.113-1.039-1.956-2.469-1.956zm1.457-6.442c-.403-1.417-1.053-1.837-2.063-1.837a1.25 1.25 0 0 0-.324.045c-.438.125-.786.49-.98 1.034-.198.55-.21 1.123-.04 1.776.309 1.169 1.139 2.015 1.975 2.015.11 0 .22-.013.324-.045.915-.256 1.488-1.653 1.108-2.988z"
                    fill-rule="nonzero"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" className="SocialIcon SocialIcon--white margin-h-small">
                <svg
                  role="img"
                  aria-label="See the Twitter Profile of Bitnami"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>twitter</title>
                  <path
                    d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm6.508 13.107c.007.136.009.273.009.406 0 4.167-3.169 8.969-8.965 8.969-1.78 0-3.437-.52-4.83-1.417.245.03.496.042.751.042a6.311 6.311 0 0 0 3.914-1.349 3.158 3.158 0 0 1-2.944-2.186 3.166 3.166 0 0 0 1.422-.055 3.154 3.154 0 0 1-2.528-3.09v-.039a3.16 3.16 0 0 0 1.428.395 3.15 3.15 0 0 1-1.402-2.625c0-.576.155-1.12.427-1.585a8.96 8.96 0 0 0 6.495 3.295 3.152 3.152 0 0 1 5.37-2.875 6.33 6.33 0 0 0 2-.765 3.166 3.166 0 0 1-1.385 1.745 6.33 6.33 0 0 0 1.81-.498 6.39 6.39 0 0 1-1.572 1.632z"
                    fill-rule="nonzero"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;