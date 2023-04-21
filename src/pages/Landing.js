const Landing = () => {  const indent = {
    marginLeft: "2rem",
  };
  return (
    <section>
      <div className="text-center mb-3">
        <i
          className="fas fa-10x fa-cookie-bite "
          style={{ color: "#e28743" }}></i>
      </div>
      <h3 className="text-center">Application Objective</h3>
      <p className="ms-3">
        <strong>"CookiesMe"</strong> is a web application powered by "MERN"
        stack that allows users to manage their cookie experiment, which would
        include the following factors:
      </p>
      <ul style={indent}>
        <li>Baking Process Instructions</li>
        <li>Production Capacity</li>
        <li>Logistics Flow</li>
        <li>Human Resource</li>
        <li>Experiment Memo</li>
      </ul>
      <p style={indent}>
        This web application has potential to be used in large scale and suit
        for pre-order homemade cookies shop.
      </p>
      <div className="ms-3">
        <h4>Features</h4>
        <ul>
          <li>
            Cookie production capacity
            <ul>
              <li>Oven size</li>
              <li>Man power</li>
            </ul>
          </li>
          <li>Stocks management</li>
          <li>User management</li>
          <li>
            Cookie baking process instructions
            <ul>
              <li>
                <strong>main purpose:</strong> to ensure the consistency of the
                cookie quality
              </li>
              <li>Manager may give instruction to employees to follow</li>
            </ul>
          </li>
        </ul>
        Each features will be printable in PDF format for practical use.
      </div>
    </section>
  );
};
export default Landing;
