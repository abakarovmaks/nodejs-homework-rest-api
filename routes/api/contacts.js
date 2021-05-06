const express = require('express');
const router = express.Router();
const Contacts = require('../../model/contacts');
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateContactFavoriteStatus,
  validationObjectId,
} = require('./contactsValidation');

const errorHandler = require('../../helper/errorHandler');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  validationAddContact,
  errorHandler(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  })
);

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 201,
        message: 'Contact deleted',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:contactId',
  validationObjectId,
  validationUpdateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({
          status: 'success',
          code: 200,
          data: { contact },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:contactId',
  validationObjectId,
  validationUpdateContactFavoriteStatus,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({
          status: 'success',
          code: 201,
          data: { contact },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
