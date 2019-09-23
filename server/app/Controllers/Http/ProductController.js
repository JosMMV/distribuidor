'use strict'

const Product = use('App/Models/Product');
const ValidationService = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    return await Product.all();
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const product = await Product.find(params.id);
    ValidationService.verifyProduct(product);
    return product;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const product = await Product.find(params.id);
    ValidationService.verifyProduct(product);
    product.merge({
      price: request.only('price').price,
    });
    await product.save();
    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy ({ params }) {
    const product = await Product.find(params.id);
    ValidationService.verifyProduct(product);
    await product.delete();
    return product;
  }
}

module.exports = ProductController
