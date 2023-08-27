import express from "express"

export class AppRouter{
  private static _instance : express.Router

  static getInstance(){
    if(!AppRouter._instance) AppRouter._instance = express.Router()
    
    return AppRouter._instance
  }
}