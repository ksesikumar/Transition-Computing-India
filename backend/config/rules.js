module.exports = [
    {
      name: "Valuation Fee Paid",
      check: (data) => data.isValuationFeePaid === true,
    },
    {
      name: "UK Resident",
      check: (data) => data.isUkResident === true,
    },
    {
      name: "Risk Rating Medium",
      check: (data) => data.riskRating === "Medium",
    },
    {
      name: "LTV Below 60%",
      check: (data) => {
        const ltv = (data.loanRequired / data.purchasePrice) * 100;
        return ltv < 60;
      },
    },
  ];
  