/// <reference types='cypress' />
import dashboardConfig from "../fixtures/dashboard.json";

describe("show pipeline", () => {
  const pipelinesId = "#pipelines";
  const importId = "#import";
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
    cy.get(pipelinesId).should("have.text", "");
    cy.get(pipelinesId).should("have.text", "");

    cy.get(pipelineAreaLabel).should("have.length", 2);
  });

  const orgNameTitle = "Organization Name";
  const accessTokenTitle = "Access Token";
  const pipelineTitle = ".pipeline__title-content";
  it("should can add pipeline, and update pipeline settings", () => {
    cy.contains(accessTokenTitle).parent().find("input[type=text]").type(token);

    cy.contains(orgNameTitle).parent().find("input[type=text]").type(orgName);

    cy.get(pipelinesId).type(`${pipelines[0]}`);

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

    cy.get(pipelinesId).should("have.value", `${pipelines[0]}`);

    cy.get(pipelinesId).type(`{enter}${pipelines[1]}`);

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

    cy.get(importId)
      .attachFile("mockedImportAuth.json")
      .then(() => {
        setTimeout(() => {
          cy.get(pipelinesId).contains(dashboardConfig.pipelines.join("\n"));
          cy.get("#oncallList").contains(dashboardConfig.oncall);
        }, 4000);
      });

    cy.get(goButton)
      .click()
      .then(() => {
        expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal("elastic");
        expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal("");
        expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
          dashboardConfig.pipelines.join("\n")
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(
          "1d03bce0997fa7376600db8819a5b64a612afe61"
        );
        expect(localStorage.getItem(DASHBOARD_AUTH.ONCALL)).to.equal(
          JSON.stringify({
            startDate: "2021-09-15",
            names: [
              "PengChong",
              "FengWen",
              "YiChen",
              "Lina",
              "ZhongRen",
              "XuDong",
              "Zhang Yu",
            ],
          })
        );
      });
  });
  it("should download the latest auth config when click download button", () => {
    cy.clearLocalStorage();

    cy.get(importId).attachFile("mockedImportAuth.json");

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

  it("should contain oncall list when click download button", () => {
    cy.clearLocalStorage();

    cy.get(importId).attachFile("mockedImportAuth.json");

    cy.get("#download")
      .click()
      .then(() => {
        setTimeout(() => {
          cy.readFile("cypress/fixtures/downloads/dashboardConfig.json").should(
            "contain",
            dashboardConfig.oncall
          );
        }, 2000);
      });
    cy.get(goButton).click();
  });
  it.only("display commit count ", () => {
    cy.clearLocalStorage();

    cy.get(importId).attachFile("mockedImportAuth.json");

    cy.get(goButton).click();

    cy.get(".person__count span").first().next().should("not.be.empty")

  })
});
