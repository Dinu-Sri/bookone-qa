# Entity and declared relationship index

Generated from workflows/business-map.json. Static declarations only; not a complete runtime call graph, ownership proof or capability certification.

| Entity symbol | SQL table | Declared fields | Source |
|---|---|---|---|
| tenantRoles | tenant_roles | id, tenantId, name, slug, templateKey, templateVersion, isLocked, customizedAt, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantRolePermissions | tenant_role_permissions | id, tenantId, roleId, permissionKey, level, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantMembershipRoles | tenant_membership_roles | id, tenantId, membershipId, roleId, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantPermissionOverrides | tenant_permission_overrides | id, tenantId, userId, permissionKey, effect, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantTeams | tenant_teams | id, tenantId, name, roleId, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantTeamMembers | tenant_team_members | id, tenantId, teamId, userId, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantMembershipScopes | tenant_membership_scopes | id, tenantId, membershipId, scopeType, targetId, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| tenantInvites | tenant_invites | id, tenantId, email, roleId, invitedBy, tokenHash, status, expiresAt, acceptedAt, acceptedUserId, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/access.ts) |
| accounts | accounts | id, tenantId, code, name, type, normalSide, parentCode, isActive, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/accounts.ts) |
| auditLog | audit_log | id, tenantId, userId, action, tableName, recordId, oldValues, newValues, ipAddress, notes, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/audit-log.ts) |
| businessDocuments | business_documents | id, tenantId, userId, partyId, transactionId, documentType, documentNumber, issueDate, dueDate, status, sourceDocumentId, discountId, discountTotal, brandId, locationId, bookDomain, subtotal, taxTotal, total, paidAmount, balanceDue, currency, notes, saleChannel, invoiceKind, deliveryDate, placeOfSupply, paymentMode, taxInvoiceNumber, supplierInvoiceNumber, exportCountry, exportRef, additionalInfo, freightAmount, dutyAmount, otherCharges, vatRate, amountInWords, purchaserTin, purchaserPhone, purchaserAddress, registerId, shiftId, posMode, sourcePosSaleId, postedAt, printStyleId, printStyleSnapshot, publicToken, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/business-documents.ts) |
| businessDocumentLines | business_document_lines | id, tenantId, documentId, productId, accountId, lineRef, description, quantity, unitPrice, unitCost, discountPercent, discountAmount, lineTotal, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/business-documents.ts) |
| tenantMemberships | tenant_memberships | id, tenantId, userId, role, primaryRoleId, status, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| companyProfiles | company_profiles | id, tenantId, legalName, tradingName, registrationNumber, country, baseCurrency, timezone, addressLine1, addressLine2, city, postalCode, phone, email, website, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| taxProfiles | tax_profiles | id, tenantId, tin, vatNumber, svatNumber, taxOffice, defaultTaxRate, taxBasis, invoicePrefix, billPrefix, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| financialYears | financial_years | id, tenantId, label, startDate, endDate, status, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| brands | brands | id, tenantId, name, code, status, notes, website, bankDetails, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| locations | locations | id, tenantId, brandId, name, code, locationType, address, status, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| companyDomains | company_domains | id, tenantId, domain, verificationToken, status, verifiedAt, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/company-settings.ts) |
| documentStyles | document_styles | id, tenantId, name, docKind, brandId, isActive, version, accentColor, logoImageKey, logoPosition, showSku, showTin, showPhone, showEmail, showBank, bankDetails, footerNotes, fontFamily, showQr, typeScale, baseFontPx, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/document-styles.ts) |
| healthCheckRuns | health_check_runs | id, tenantId, userId, status, suite, seed, stepsJson, createdJson, summary, errorMessage, startedAt, finishedAt, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/health-check.ts) |
| inventorySettings | inventory_settings | id, tenantId, negativeStockPolicy, costingMethod, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory-settings.ts) |
| inventoryProducts | inventory_products | id, tenantId, sku, name, description, longDescription, productType, unit, unitCost, sellPrice, revenueAccountCode, cogsAccountCode, inventoryAccountCode, expenseAccountCode, category, categoryId, brandId, barcode, sellable, purchasable, taxStatus, reorderLevel, reorderQty, preferredVendorId, notes, imageKey, hireUnit, turnaroundHours, depositAmount, replacementPrice, tracksSerials, isActive, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryProductCategories | inventory_product_categories | id, tenantId, name, slug, parentId, brandId, locationId, sortOrder, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryStockLevels | inventory_stock_levels | id, tenantId, productId, locationId, qtyOnHand, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryStockDocs | inventory_stock_docs | id, tenantId, userId, docType, documentNumber, docDate, status, fromLocationId, toLocationId, reason, notes, transactionId, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryStockDocLines | inventory_stock_doc_lines | id, tenantId, stockDocId, productId, quantity, unitCost, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryCostLayers | inventory_cost_layers | id, tenantId, productId, locationId, qtyReceived, qtyRemaining, unitCost, receivedOn, sourceType, sourceId, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryCostLayerConsumptions | inventory_cost_layer_consumptions | id, tenantId, layerId, productId, qty, unitCost, sourceType, sourceId, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| inventoryMovements | inventory_movements | id, tenantId, userId, movementType, productId, quantity, unitCost, fromLocationId, toLocationId, referenceType, referenceId, transactionId, memo, movementDate, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts) |
| journalEntries | journal_entries | id, tenantId, userId, transactionId, brandId, locationId, bookDomain, memo, entryDate, isBalanced, notes, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/journal-entries.ts) |
| journalLines | journal_lines | id, tenantId, journalEntryId, accountId, brandId, locationId, side, amount, memo, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/journal-lines.ts) |
| opsRequestLogs | ops_request_logs | id, createdAt, kind, path, durationMs, status, message | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/ops.ts) |
| opsIdempotency | ops_idempotency | tenantId, key, resultJson, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/ops.ts) |
| parties | parties | id, tenantId, name, kind, code, phone, email, address, taxId, creditLimit, paymentTermsDays, notes, displayName, legalName, partyType, isCustomer, isVendor, nic, brn, tin, vatNumber, svatNumber, taxStatus, phoneMobile, phoneLandline, website, addressLine1, addressLine2, city, district, province, postalCode, country, contactPerson, contactPhone, contactEmail, preferredCurrency, bankName, bankBranch, bankAccountName, bankAccountNo, bankSwift, status, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/parties.ts) |
| platformAuditEvents | platform_audit_events | id, actorUserId, targetTenantId, action, summary, meta, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/platform.ts) |
| posRegisters | pos_registers | id, tenantId, code, name, locationId, printMode, thermalDeviceHint, receiptFooter, defaultPaymentAccountCode, isActive, sortOrder, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/pos.ts) |
| posShifts | pos_shifts | id, tenantId, registerId, openedBy, closedBy, status, openingFloat, closingCashCount, expectedCash, varianceCash, notes, openedAt, closedAt, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/pos.ts) |
| purchaseSettings | purchase_settings | id, tenantId, requireBillApproval, requireSupplierInvoiceNo, blockDuplicateBills, requireGrnBeforeBill, postGrniOnReceipt, defaultPaymentTerms, defaultExpenseAccount, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/purchase-settings.ts) |
| bankStatementProfiles | bank_statement_profiles | id, tenantId, name, bankHint, columnMap, signConvention, dateFormatHint, skipRows, sheetName, successCount, version, bankAccountId, currentVersionId, profileStatus, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankStatementProfileVersions | bank_statement_profile_versions | id, tenantId, profileId, versionNumber, status, columnMappings, amountRules, dateRules, rowFilters, structureFingerprint, sampleSignatures, notes, createdBy, approvedBy, createdAt, approvedAt, supersededAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankStatementImports | bank_statement_imports | id, tenantId, userId, period, fileName, status, rowCount, matchedCount, unmatchedCount, metadata, bankAccountId, bookDomain, fileSha256, storageKey, periodFrom, periodTo, parserProfileId, source, wizardStatus, wizardStep, draftPayload, draftVersion, contentFingerprint, openingBalance, closingBalance, totalMoneyIn, totalMoneyOut, idempotencyKey, profileVersionId, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankStatementLines | bank_statement_lines | id, tenantId, importId, matchedTransactionId, rowNumber, transactionDate, description, amount, status, raw, reviewedByUserId, reviewedAt, notes, fingerprint, direction, balanceAfter, externalRef, matchScore, matchMethod, matchCandidates, proposedAction, createdTransactionId, confidence, valueDate, debitAmount, creditAmount, validationStatus, validationMessages, sourceRowHash, transformLog, reconciliationStatus, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankStatementImportEvents | bank_statement_import_events | id, tenantId, importId, userId, lineId, action, detail, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankImportIssues | bank_import_issues | id, tenantId, importId, lineId, issueType, severity, status, title, detail, resolution, resolutionDetail, applyToSimilar, resolvedBy, resolvedAt, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| periodLocks | period_locks | id, tenantId, userId, period, status, lockedAt, unlockedAt, notes, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationSessions | bank_reconciliation_sessions | id, tenantId, bankAccountId, bookDomain, periodFrom, periodTo, statementReference, status, statementOpeningBalance, statementClosingBalance, bookOpeningBalanceSnapshot, bookClosingBalanceSnapshot, outstandingNet, adjustmentNet, differenceAmount, toleranceAmount, sourceFileCount, bankLineCount, resolvedCaseCount, openCaseCount, version, preparedBy, reconciledBy, reconciledAt, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationSessionImports | bank_reconciliation_session_imports | id, tenantId, sessionId, importId, attachedBy, attachedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationCases | bank_reconciliation_cases | id, tenantId, sessionId, caseType, confidence, state, matchScore, matchMethod, explanation, reasonCodes, userLabel, resultLabel, createdTransactionId, exclusionReason, deferredUntil, sortDate, sortAmount, version, confirmedBy, confirmedAt, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationCaseBankLines | bank_reconciliation_case_bank_lines | id, tenantId, caseId, bankLineId, allocatedAmount, role, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationCaseBookTransactions | bank_reconciliation_case_book_transactions | id, tenantId, caseId, transactionId, allocatedAmount, role, createdAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationOutstandingItems | bank_reconciliation_outstanding_items | id, tenantId, sessionId, transactionId, caseId, reason, expectedClearDate, status, createdBy, createdAt, resolvedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationEvents | bank_reconciliation_events | id, tenantId, sessionId, caseId, userId, action, beforeValues, afterValues, reason, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| bankReconciliationSnapshots | bank_reconciliation_snapshots | id, tenantId, sessionId, summary, createdBy, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/reconciliation.ts) |
| rentalSettings | rental_settings | id, tenantId, allowHirePerEvent, allowHirePerDay, allowHirePerHour, defaultHireUnit, allowInvoiceOnConfirm, allowInvoiceOnDispatch, allowInvoiceAfterReturn, allowInvoiceManual, defaultInvoiceTiming, allowInvoiceTimingOverride, allowDepositPerEvent, allowDepositPerItem, defaultDepositMode, defaultEventDepositAmount, defaultEventDepositPercent, overlapPolicy, defaultTurnaroundHours, defaultLateFeePerDay, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental-settings.ts) |
| rentalEvents | rental_events | id, tenantId, documentId, eventDate, hireFrom, hireTo, venue, guestCount, deliverAt, collectAt, packingNotes, depositHeld, depositApplied, depositRefunded, overlapOverrideReason, overlapOverriddenBy, invoiceTiming, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental.ts) |
| rentalBookingLines | rental_booking_lines | id, tenantId, documentId, documentLineId, productId, locationId, qty, hireFrom, hireTo, status, dispatchedQty, returnedQty, damagedQty, missingQty, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental.ts) |
| rentalReturnPhotos | rental_return_photos | id, tenantId, bookingLineId, documentId, imageKey, caption, createdBy, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental.ts) |
| rentalKitComponents | rental_kit_components | id, tenantId, kitProductId, componentProductId, qty, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental.ts) |
| rentalSerials | rental_serials | id, tenantId, productId, serialCode, status, bookingLineId, notes, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/rental.ts) |
| salesDiscounts | sales_discounts | id, tenantId, name, code, discountType, value, isActive, startsOn, endsOn, notes, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/sales-discounts.ts) |
| salesSettings | sales_settings | id, tenantId, vatRatePercent, exportVatRatePercent, vatRegistered, taxInvoiceDeptCode, taxInvoiceSerialReset, defaultSaleChannel, defaultInvoiceKind, enforceCreditLimit, editLockDays, invoicePrefix, invoicePostfix, invoicePad, invoiceReset, quotePrefix, quotePostfix, quotePad, quoteReset, createdAt, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/sales-settings.ts) |
| taxInvoiceSequences | tax_invoice_sequences | id, tenantId, yearYy, monthMmm, deptCode, lastSerial, updatedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/sales-settings.ts) |
| salesInvoiceSources | sales_invoice_sources | id, tenantId, invoiceId, salesOrderId, createdAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/sales-settings.ts) |
| settlementAllocations | settlement_allocations | id, tenantId, paymentTransactionId, invoiceTransactionId, allocatedAmount, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/settlement-allocations.ts) |
| tenants | tenants | id, name, slug, plan, environment, status, modules, entityKind, capabilityTier, rbacEnforced, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/tenants.ts) |
| transactions | transactions | id, tenantId, userId, accountingType, direction, party, description, amount, currency, paymentMethod, paymentAccountId, brandId, locationId, bookDomain, transferSourceAccountId, reversesTransactionId, reversedByTransactionId, date, receiptRef, categoryCode, categoryName, categoryConfidence, categorySource, invoiceRef, isAlreadySettled, notes, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/transactions.ts) |
| users | users | id, tenantId, activeTenantId, email, name, passwordHash, role, createdAt, updatedAt, voidedAt | [source](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/users.ts) |

## Declared references

| From | Field | To |
|---|---|---|
| tenantInvites | invitedBy | users.id |
| tenantInvites | acceptedUserId | users.id |
| accounts | tenantId | tenants.id |
| auditLog | tenantId | tenants.id |
| auditLog | userId | users.id |
| businessDocuments | tenantId | tenants.id |
| businessDocuments | userId | users.id |
| businessDocuments | partyId | parties.id |
| businessDocuments | transactionId | transactions.id |
| businessDocuments | sourceDocumentId | businessDocuments.id |
| businessDocuments | discountId | salesDiscounts.id |
| businessDocuments | brandId | brands.id |
| businessDocuments | locationId | locations.id |
| businessDocumentLines | tenantId | tenants.id |
| businessDocumentLines | documentId | businessDocuments.id |
| businessDocumentLines | productId | inventoryProducts.id |
| businessDocumentLines | accountId | accounts.id |
| tenantMemberships | tenantId | tenants.id |
| tenantMemberships | userId | users.id |
| companyProfiles | tenantId | tenants.id |
| taxProfiles | tenantId | tenants.id |
| financialYears | tenantId | tenants.id |
| brands | tenantId | tenants.id |
| locations | tenantId | tenants.id |
| locations | brandId | brands.id |
| companyDomains | tenantId | tenants.id |
| documentStyles | brandId | brands.id |
| inventoryProducts | tenantId | tenants.id |
| inventoryProducts | categoryId | inventoryProductCategories.id |
| inventoryProducts | brandId | brands.id |
| inventoryProducts | preferredVendorId | parties.id |
| inventoryProductCategories | tenantId | tenants.id |
| inventoryProductCategories | parentId | inventoryProductCategories.id |
| inventoryProductCategories | brandId | brands.id |
| inventoryProductCategories | locationId | locations.id |
| inventoryStockLevels | tenantId | tenants.id |
| inventoryStockLevels | productId | inventoryProducts.id |
| inventoryStockLevels | locationId | locations.id |
| inventoryStockDocs | tenantId | tenants.id |
| inventoryStockDocs | userId | users.id |
| inventoryStockDocs | fromLocationId | locations.id |
| inventoryStockDocs | toLocationId | locations.id |
| inventoryStockDocs | transactionId | transactions.id |
| inventoryStockDocLines | tenantId | tenants.id |
| inventoryStockDocLines | stockDocId | inventoryStockDocs.id |
| inventoryStockDocLines | productId | inventoryProducts.id |
| inventoryCostLayers | locationId | locations.id |
| inventoryMovements | tenantId | tenants.id |
| inventoryMovements | userId | users.id |
| inventoryMovements | productId | inventoryProducts.id |
| inventoryMovements | fromLocationId | locations.id |
| inventoryMovements | toLocationId | locations.id |
| inventoryMovements | transactionId | transactions.id |
| journalEntries | tenantId | tenants.id |
| journalEntries | userId | users.id |
| journalEntries | transactionId | transactions.id |
| journalEntries | brandId | brands.id |
| journalEntries | locationId | locations.id |
| journalLines | tenantId | tenants.id |
| journalLines | journalEntryId | journalEntries.id |
| journalLines | accountId | accounts.id |
| journalLines | brandId | brands.id |
| journalLines | locationId | locations.id |
| parties | tenantId | tenants.id |
| platformAuditEvents | targetTenantId | tenants.id |
| posRegisters | tenantId | tenants.id |
| posRegisters | locationId | locations.id |
| posShifts | tenantId | tenants.id |
| posShifts | registerId | posRegisters.id |
| posShifts | openedBy | users.id |
| posShifts | closedBy | users.id |
| bankStatementProfiles | tenantId | tenants.id |
| bankStatementProfiles | bankAccountId | accounts.id |
| bankStatementProfileVersions | tenantId | tenants.id |
| bankStatementProfileVersions | profileId | bankStatementProfiles.id |
| bankStatementProfileVersions | createdBy | users.id |
| bankStatementProfileVersions | approvedBy | users.id |
| bankStatementImports | tenantId | tenants.id |
| bankStatementImports | userId | users.id |
| bankStatementImports | bankAccountId | accounts.id |
| bankStatementImports | parserProfileId | bankStatementProfiles.id |
| bankStatementImports | profileVersionId | bankStatementProfileVersions.id |
| bankStatementLines | tenantId | tenants.id |
| bankStatementLines | importId | bankStatementImports.id |
| bankStatementLines | matchedTransactionId | transactions.id |
| bankStatementLines | reviewedByUserId | users.id |
| bankStatementLines | createdTransactionId | transactions.id |
| bankStatementImportEvents | tenantId | tenants.id |
| bankStatementImportEvents | importId | bankStatementImports.id |
| bankStatementImportEvents | userId | users.id |
| bankStatementImportEvents | lineId | bankStatementLines.id |
| bankImportIssues | tenantId | tenants.id |
| bankImportIssues | importId | bankStatementImports.id |
| bankImportIssues | lineId | bankStatementLines.id |
| bankImportIssues | resolvedBy | users.id |
| periodLocks | tenantId | tenants.id |
| periodLocks | userId | users.id |
| bankReconciliationSessions | tenantId | tenants.id |
| bankReconciliationSessions | bankAccountId | accounts.id |
| bankReconciliationSessions | preparedBy | users.id |
| bankReconciliationSessions | reconciledBy | users.id |
| bankReconciliationSessionImports | tenantId | tenants.id |
| bankReconciliationSessionImports | sessionId | bankReconciliationSessions.id |
| bankReconciliationSessionImports | importId | bankStatementImports.id |
| bankReconciliationSessionImports | attachedBy | users.id |
| bankReconciliationCases | tenantId | tenants.id |
| bankReconciliationCases | sessionId | bankReconciliationSessions.id |
| bankReconciliationCases | createdTransactionId | transactions.id |
| bankReconciliationCases | confirmedBy | users.id |
| bankReconciliationCaseBankLines | tenantId | tenants.id |
| bankReconciliationCaseBankLines | caseId | bankReconciliationCases.id |
| bankReconciliationCaseBankLines | bankLineId | bankStatementLines.id |
| bankReconciliationCaseBookTransactions | tenantId | tenants.id |
| bankReconciliationCaseBookTransactions | caseId | bankReconciliationCases.id |
| bankReconciliationCaseBookTransactions | transactionId | transactions.id |
| bankReconciliationOutstandingItems | tenantId | tenants.id |
| bankReconciliationOutstandingItems | sessionId | bankReconciliationSessions.id |
| bankReconciliationOutstandingItems | transactionId | transactions.id |
| bankReconciliationOutstandingItems | caseId | bankReconciliationCases.id |
| bankReconciliationOutstandingItems | createdBy | users.id |
| bankReconciliationEvents | tenantId | tenants.id |
| bankReconciliationEvents | sessionId | bankReconciliationSessions.id |
| bankReconciliationEvents | caseId | bankReconciliationCases.id |
| bankReconciliationEvents | userId | users.id |
| bankReconciliationSnapshots | tenantId | tenants.id |
| bankReconciliationSnapshots | sessionId | bankReconciliationSessions.id |
| bankReconciliationSnapshots | createdBy | users.id |
| rentalEvents | tenantId | tenants.id |
| rentalEvents | documentId | businessDocuments.id |
| rentalEvents | overlapOverriddenBy | users.id |
| rentalBookingLines | tenantId | tenants.id |
| rentalBookingLines | documentId | businessDocuments.id |
| rentalBookingLines | documentLineId | businessDocumentLines.id |
| rentalBookingLines | productId | inventoryProducts.id |
| rentalBookingLines | locationId | locations.id |
| rentalReturnPhotos | tenantId | tenants.id |
| rentalReturnPhotos | bookingLineId | rentalBookingLines.id |
| rentalReturnPhotos | documentId | businessDocuments.id |
| rentalReturnPhotos | createdBy | users.id |
| rentalKitComponents | tenantId | tenants.id |
| rentalKitComponents | kitProductId | inventoryProducts.id |
| rentalKitComponents | componentProductId | inventoryProducts.id |
| rentalSerials | tenantId | tenants.id |
| rentalSerials | productId | inventoryProducts.id |
| rentalSerials | bookingLineId | rentalBookingLines.id |
| salesDiscounts | tenantId | tenants.id |
| salesSettings | tenantId | tenants.id |
| taxInvoiceSequences | tenantId | tenants.id |
| salesInvoiceSources | tenantId | tenants.id |
| salesInvoiceSources | invoiceId | businessDocuments.id |
| salesInvoiceSources | salesOrderId | businessDocuments.id |
| settlementAllocations | tenantId | tenants.id |
| settlementAllocations | paymentTransactionId | transactions.id |
| settlementAllocations | invoiceTransactionId | transactions.id |
| transactions | tenantId | tenants.id |
| transactions | userId | users.id |
| transactions | paymentAccountId | accounts.id |
| transactions | brandId | brands.id |
| transactions | locationId | locations.id |
| transactions | transferSourceAccountId | accounts.id |
| transactions | reversesTransactionId | transactions.id |
| transactions | reversedByTransactionId | transactions.id |
| users | tenantId | tenants.id |
| users | activeTenantId | tenants.id |
