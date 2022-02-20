import Script from "next/script";
export default function Recaptcha(props) {
  const { sitekey } = props;
  const onloadCallback = function () {
    grecaptcha.render("g-recaptcha", {
      sitekey: sitekey,
    });
  };
  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        async
        defer
      />
      <div id="g-recaptcha"></div>
    </>
  );
}
