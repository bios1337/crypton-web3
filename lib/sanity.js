import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "m1usouh7",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skGhhTFCQwyFqu3P3AVgDxRGQxToqEaVsWhtomhll4AKt6mNdDw0H0JSb4OV9aqVtBN6BGDe2LVFGFR7facRB7H15NXUSFXxPgrDGZw3cYTq1l3c871s786XZ3xEzwnNxnVVDBX6mTsAJx8aGqTjswMh6uhT6XiMtACEFOGHKXS9V8V75ulD",
  useCdn: false,
});
