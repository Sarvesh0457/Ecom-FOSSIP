router.post(
  "/create",
  verifyJWT,
  authorizeRoles("seller", "admin"),
  createProduct,
);
