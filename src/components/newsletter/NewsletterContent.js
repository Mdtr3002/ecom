import { useState } from "react";

const NewsletterContent = (props) => {
  const { title, subTitle, formInfo } = props;
  const [error, setError] = useState(false);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="newsletter-card card shadow">
          <div className="card-body p-4 p-sm-5">
            <div className="text-center">
              <h2>{title}</h2>
              <p className="mb-5">{subTitle}</p>
            </div>
            {/* Form */}
            <form onSubmit={e => { e.preventDefault(); }} >
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <input
                    className="form-control"
                    type="email"
                    placeholder={formInfo[0].inputPlaceholder}
                    aria-describedby="mailHelp" />
                  <small className="text-muted text-start" id="mailHelp">
                    <i className={`bi ${formInfo[0].helperIcon} me-1`} />
                    {formInfo[0].helperText}
                  </small>
                  {
                    error &&
                    <p style={{ color: 'red' }}>Subscribe feature is about to go on air. Please stay tune!</p>
                  }
                  <button className={`btn btn-${formInfo[0].buttonColor} w-100 mt-4 rounded-pill`} type="submit" onClick={() => setError(true)}>
                    {formInfo[0].buttonText}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterContent;
