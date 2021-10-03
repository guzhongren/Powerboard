/// <reference types='cypress' />
import dashboardConfig from "../fixtures/dashboard.json";

describe("show pipeline", () => {
  const inputLabel = "input";
  const pipelineAreaLabel = "textarea";
  const goButton = ".btn";
  const token = dashboardConfig.token;
  const orgName = dashboardConfig.orgName;
  const pipelines = dashboardConfig.pipelines;

  const DASHBOARD_AUTH = {
    ORG: "org",
    TEAM: "team",
    SEARCH: "search",
    TOKEN: "token",
    ONCALL: "oncall",
  };

  beforeEach(() => {
    cy.visit(Cypress.env("url"));
  });

  it("displays buildKite info dialog", () => {
    cy.get(inputLabel).should("have.length", 4);

    cy.get(inputLabel).first().should("have.text", "");
    cy.get(inputLabel).last().should("have.text", "");

    cy.get(pipelineAreaLabel).should("have.length", 2);
  });

  const orgNameTitle = "Organization Name";
  const accessTokenTitle = "Access Token";
  const pipelineTitle = ".pipeline__title-content";
  it("should can add pipeline, and update pipeline settings", () => {
    cy.contains(accessTokenTitle).parent().find("input[type=text]").type(token);

    cy.contains(orgNameTitle).parent().find("input[type=text]").type(orgName);

    cy.get("textarea").first().type(`${pipelines[0]}`);

    cy.get(goButton)
      .click()
      .then(() => {
        expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal(orgName);
        expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal("");
        expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
          pipelines[0]
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(token);
      })
      .then(() => {
        cy.get(pipelineTitle).first().should("have.text", pipelines[0]);
      });

    // should update the pipeline settings

    cy.get(".icon.setting").click();
    cy.contains(accessTokenTitle)
      .parent()
      .find("input[type=text]")
      .should("have.value", token);
    cy.contains(orgNameTitle)
      .parent()
      .find("input[type=text]")
      .should("have.value", orgName);

    cy.get("textarea").should("have.value", `${pipelines[0]}`);

    cy.get("textarea").type(`{enter}${pipelines[1]}`);

    cy.get(goButton)
      .click()
      .then(() => {
        expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal(orgName);
        expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal("");
        expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
          pipelines.join("\n")
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(token);
      })
      .then(() => {
        cy.get(pipelineTitle).should("have.length", 2);
      });
  });

  it("should import auth config json file into app", () => {
    cy.clearLocalStorage();

    cy.get("#import").attachFile("mockedImportAuth.json");
    cy.get(goButton)
      .click()
      .then(() => {
        expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal("elastic");
        expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal("");
        expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
          ["apm-onweek-alerts-as-code", "kibana / on merge"].join("\n")
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(
          "1d03bce0997fa7376600db8819a5b64a612afe61"
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.ONCALL)).to.equal(
          ""
        );
      });
  });
  it("should download the latest auth config when click download button", () => {
    cy.clearLocalStorage();

    cy.get("#import").attachFile("mockedImportAuth.json");

    cy.get("#download")
      .click()
      .then(() => {
        setTimeout(() => {
          cy.readFile("cypress/fixtures/downloads/dashboardConfig.json")
            .should("contain", dashboardConfig.token)
            .should("contain", dashboardConfig.orgName)
            .should("contain", dashboardConfig.pipelines[0])
            .should("contain", dashboardConfig.pipelines[1]);
        }, 2000);
      });
    cy.get(goButton).click();
  });
});
