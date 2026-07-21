/**
 * Automated Verification Script for Torkkk Backend Phase 1 Enhancements
 * Tests Site Settings, Homepage CMS, SEO, Soft Deletes, and Audit Logging
 */

const BASE_URL = "http://localhost:5000";
const credentials = {
  email: "superadmin@torkkk.com",
  password: "ChangeMe@2026!",
};

let accessToken = "";
let createdBlogId = "";
let createdPlanId = "";

async function runTests() {
  console.log("🚀 Starting Phase 1 Enhancements Verification Tests...\n");

  try {
    // 1. Health Check
    console.log("--- 1. Testing GET /health ---");
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log(`Status: ${healthRes.status}`);
    if (!healthData.success) throw new Error("Health check failed");
    console.log("✅ Health Check Passed\n");

    // 2. Admin Login
    console.log("--- 2. Testing POST /api/auth/login ---");
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const loginData = await loginRes.json();
    console.log(`Status: ${loginRes.status}`);
    if (!loginData.success) throw new Error("Login failed");
    accessToken = loginData.data.accessToken;
    console.log("✅ Admin Login Passed (Token obtained)\n");

    const authHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    };

    // 3. Get Site Settings (Public)
    console.log("--- 3. Testing GET /api/settings ---");
    const getSettingsRes = await fetch(`${BASE_URL}/api/settings`);
    const getSettingsData = await getSettingsRes.json();
    console.log(`Status: ${getSettingsRes.status}`);
    console.log("Settings Company Name:", getSettingsData.data?.companyName);
    if (!getSettingsData.success) throw new Error("Failed to get site settings");
    console.log("✅ Get Site Settings Passed\n");

    // 4. Update Site Settings (Admin)
    console.log("--- 4. Testing PUT /api/admin/settings ---");
    const newSettings = {
      companyName: "Torkkk International",
      supportEmail: "hello@torkkk.com",
      supportPhone: "+2348000TORKKK",
      socialFacebook: "https://facebook.com/torkkkglobal",
    };
    const updateSettingsRes = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(newSettings),
    });
    const updateSettingsData = await updateSettingsRes.json();
    console.log(`Status: ${updateSettingsRes.status}`);
    console.log("Updated Settings Company Name:", updateSettingsData.data?.companyName);
    if (!updateSettingsData.success || updateSettingsData.data.companyName !== "Torkkk International") {
      throw new Error("Failed to update site settings");
    }
    console.log("✅ Update Site Settings Passed\n");

    // 5. Get Homepage Content (Public)
    console.log("--- 5. Testing GET /api/homepage ---");
    const getHomepageRes = await fetch(`${BASE_URL}/api/homepage`);
    const getHomepageData = await getHomepageRes.json();
    console.log(`Status: ${getHomepageRes.status}`);
    console.log("Homepage Hero Title:", getHomepageData.data?.heroTitle);
    if (!getHomepageData.success) throw new Error("Failed to get homepage content");
    console.log("✅ Get Homepage Content Passed\n");

    // 6. Update Homepage CMS (Admin)
    console.log("--- 6. Testing PUT /api/admin/homepage ---");
    const newHomepage = {
      heroTitle: "Nigeria's Premium Mobility System",
      heroSubtitle: "Moving you safely and reliably across major cities.",
      heroCtaText: "Ride Now",
      heroCtaLink: "/ride",
      features: [
        { icon: "Compass", title: "Smart Routing", description: "Optimal routes dynamically calculated." },
      ],
    };
    const updateHomepageRes = await fetch(`${BASE_URL}/api/admin/homepage`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(newHomepage),
    });
    const updateHomepageData = await updateHomepageRes.json();
    console.log(`Status: ${updateHomepageRes.status}`);
    console.log("Updated Hero Title:", updateHomepageData.data?.heroTitle);
    if (!updateHomepageData.success || updateHomepageData.data.heroTitle !== "Nigeria's Premium Mobility System") {
      throw new Error("Failed to update homepage content");
    }
    console.log("✅ Update Homepage CMS Passed\n");

    // 7. Create Blog Post with custom Slug and SEO fields (Admin)
    console.log("--- 7. Testing POST /api/admin/blogs with SEO & Custom Slug ---");
    const blogPayload = {
      title: "Testing SEO Features on Torkkk API",
      slug: "testing-seo-features-special-slug",
      content: "This blog post tests custom slug and meta title/description SEO support...",
      excerpt: "Testing SEO fields and soft deletes on Torkkk.",
      author: "Quality Analyst",
      metaTitle: "SEO Testing | Torkkk Blog",
      metaDescription: "Verify metadata fields and OG tags dynamically.",
      canonicalUrl: "https://torkkk.com/blog/testing-seo-features-special-slug",
      ogImage: "https://torkkk.com/assets/og-testing.jpg",
      keywords: ["SEO", "soft delete", "Prisma"],
    };
    const createBlogRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(blogPayload),
    });
    const createBlogData = await createBlogRes.json();
    console.log(`Status: ${createBlogRes.status}`);
    console.log("Created Blog Slug:", createBlogData.data?.slug);
    console.log("Created Blog SEO Title:", createBlogData.data?.metaTitle);
    if (!createBlogData.success || createBlogData.data.slug !== "testing-seo-features-special-slug") {
      throw new Error("Failed to create blog with custom slug and SEO fields");
    }
    createdBlogId = createBlogData.data.id;
    console.log("✅ Create Blog Post Passed\n");

    // 8. Soft Delete Blog Post (Admin)
    console.log("--- 8. Testing DELETE /api/admin/blogs/:id (Soft Delete) ---");
    const deleteBlogRes = await fetch(`${BASE_URL}/api/admin/blogs/${createdBlogId}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    const deleteBlogData = await deleteBlogRes.json();
    console.log(`Status: ${deleteBlogRes.status}`);
    if (!deleteBlogData.success) throw new Error("Soft delete blog failed");
    console.log("✅ Soft Delete Blog Passed\n");

    // 9. Verify soft-deleted Blog is hidden by default in Admin view
    console.log("--- 9. Testing GET /api/admin/blogs (Deleted post should NOT be visible by default) ---");
    const getBlogsAdminRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
      headers: authHeaders,
    });
    const getBlogsAdminData = await getBlogsAdminRes.json();
    console.log(`Status: ${getBlogsAdminRes.status}`);
    const existsDefault = getBlogsAdminData.data?.some(b => b.id === createdBlogId);
    console.log("Blog found in default admin list?", existsDefault);
    if (existsDefault) throw new Error("Soft deleted blog returned by default admin list!");
    console.log("✅ Hiding Soft-deleted Blog by Default Passed\n");

    // 10. Verify soft-deleted Blog is returned when showDeleted=true
    console.log("--- 10. Testing GET /api/admin/blogs?showDeleted=true (Should contain deleted blog) ---");
    const getDeletedBlogsRes = await fetch(`${BASE_URL}/api/admin/blogs?showDeleted=true`, {
      headers: authHeaders,
    });
    const getDeletedBlogsData = await getDeletedBlogsRes.json();
    console.log(`Status: ${getDeletedBlogsRes.status}`);
    const existsDeleted = getDeletedBlogsData.data?.some(b => b.id === createdBlogId);
    console.log("Blog found in showDeleted=true list?", existsDeleted);
    if (!existsDeleted) throw new Error("Soft deleted blog not found in showDeleted=true list!");
    console.log("✅ Retrieval of Soft-deleted Blog with Query Param Passed\n");

    // 11. Restore Soft Deleted Blog Post (Admin)
    console.log("--- 11. Testing POST /api/admin/blogs/:id/restore ---");
    const restoreBlogRes = await fetch(`${BASE_URL}/api/admin/blogs/${createdBlogId}/restore`, {
      method: "POST",
      headers: authHeaders,
    });
    const restoreBlogData = await restoreBlogRes.json();
    console.log(`Status: ${restoreBlogRes.status}`);
    console.log("Restored Blog title:", restoreBlogData.data?.title);
    if (!restoreBlogData.success || restoreBlogData.data.deletedAt !== null) {
      throw new Error("Failed to restore soft deleted blog");
    }
    console.log("✅ Restore Blog Post Passed\n");

    // 12. Create Subscription Plan, Soft-delete & Restore
    console.log("--- 12. Testing Plan Create, Soft-delete & Restore ---");
    const planPayload = {
      name: "Temporary Driver Plan",
      type: "DRIVER",
      displayPrice: "₦1,000/week",
      description: "A short term plan to be deleted.",
      features: ["Daily rides limit", "Basic support"],
      displayOrder: 10,
    };
    const createPlanRes = await fetch(`${BASE_URL}/api/admin/subscriptions/plans`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(planPayload),
    });
    const createPlanData = await createPlanRes.json();
    if (!createPlanData.success) throw new Error("Create plan failed");
    createdPlanId = createPlanData.data.id;
    console.log(`Plan created: ID ${createdPlanId}`);

    // Soft delete plan
    const deletePlanRes = await fetch(`${BASE_URL}/api/admin/subscriptions/plans/${createdPlanId}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    console.log(`Plan Soft Delete Status: ${deletePlanRes.status}`);

    // Verify it's not in public plans
    const getPublicPlansRes = await fetch(`${BASE_URL}/api/subscriptions/plans`);
    const getPublicPlansData = await getPublicPlansRes.json();
    const foundInPublic = getPublicPlansData.data?.some(p => p.id === createdPlanId);
    console.log("Deleted Plan found in public plans?", foundInPublic);
    if (foundInPublic) throw new Error("Deleted subscription plan still visible publicly!");

    // Restore plan
    const restorePlanRes = await fetch(`${BASE_URL}/api/admin/subscriptions/plans/${createdPlanId}/restore`, {
      method: "POST",
      headers: authHeaders,
    });
    const restorePlanData = await restorePlanRes.json();
    console.log("Restored Plan Name:", restorePlanData.data?.name);
    if (!restorePlanData.success || restorePlanData.data.deletedAt !== null) {
      throw new Error("Failed to restore plan");
    }
    console.log("✅ Plan Create, Soft-delete, and Restore Passed\n");

    // 13. Audit Log Retrieval & Verification
    console.log("--- 13. Testing GET /api/admin/audit-logs ---");
    const auditRes = await fetch(`${BASE_URL}/api/admin/audit-logs`, {
      headers: authHeaders,
    });
    const auditData = await auditRes.json();
    console.log(`Status: ${auditRes.status}`);
    console.log(`Audit Logs count: ${auditData.data?.length}`);
    console.log("Sample recent actions in logs:");
    auditData.data?.slice(0, 8).forEach(log => {
      console.log(` - Action: ${log.action} | Target Type: ${log.targetType} | Admin: ${log.adminEmail}`);
    });

    const actions = auditData.data?.map(l => l.action) || [];
    const expectedActions = [
      "LOGIN_SUCCESS",
      "UPDATE_SITE_SETTINGS",
      "UPDATE_HOMEPAGE_CMS",
      "CREATE_BLOG",
      "DELETE_BLOG_SOFT",
      "RESTORE_BLOG",
      "CREATE_SUBSCRIPTION_PLAN",
      "DELETE_SUBSCRIPTION_PLAN_SOFT",
      "RESTORE_SUBSCRIPTION_PLAN"
    ];

    console.log("\nVerifying logged actions:");
    expectedActions.forEach(act => {
      const logged = actions.includes(act);
      console.log(` - ${act}: ${logged ? "✅ Logged" : "❌ NOT LOGGED"}`);
      if (!logged) throw new Error(`Expected action ${act} was not found in audit logs!`);
    });

    console.log("\n⭐️ ALL PHASE 1 ENHANCEMENT TESTS PASSED SUCCESSFULLY! ⭐️");

  } catch (err) {
    console.error("\n❌ TEST FAILURE:", err.message);
    process.exit(1);
  }
}

runTests();
