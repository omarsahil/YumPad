"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealDBService = void 0;
// @ts-ignore
var node_fetch_1 = require("node-fetch");
var MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
var MealDBService = /** @class */ (function () {
    function MealDBService() {
    }
    // Search recipes by name
    MealDBService.searchByName = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/search.php?s=").concat(encodeURIComponent(query)))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch recipes");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data && Array.isArray(data.meals) ? data.meals : []];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error searching recipes by name:", error_1);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get random recipe
    MealDBService.getRandomRecipe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/random.php"))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch random recipe");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data && Array.isArray(data.meals) && data.meals[0]
                                ? data.meals[0]
                                : null];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching random recipe:", error_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get multiple random recipes
    MealDBService.getMultipleRandomRecipes = function () {
        return __awaiter(this, arguments, void 0, function (count) {
            var promises, results, error_3;
            var _this = this;
            if (count === void 0) { count = 8; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        promises = Array(count)
                            .fill(null)
                            .map(function () { return _this.getRandomRecipe(); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.filter(function (recipe) { return recipe !== null; })];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error fetching multiple random recipes:", error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get recipe by ID
    MealDBService.getRecipeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/lookup.php?i=").concat(id))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch recipe");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data && Array.isArray(data.meals) && data.meals[0]
                                ? data.meals[0]
                                : null];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error fetching recipe by ID:", error_4);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get recipes by category
    MealDBService.getRecipesByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, detailedRecipes, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/filter.php?c=").concat(encodeURIComponent(category)))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch recipes by category");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!data || !Array.isArray(data.meals))
                            return [2 /*return*/, []];
                        return [4 /*yield*/, Promise.all(data.meals
                                .slice(0, 12)
                                .map(function (meal) { return _this.getRecipeById(meal.idMeal); }))];
                    case 3:
                        detailedRecipes = _a.sent();
                        return [2 /*return*/, detailedRecipes.filter(function (recipe) { return recipe !== null; })];
                    case 4:
                        error_5 = _a.sent();
                        console.error("Error fetching recipes by category:", error_5);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Get recipes by area (cuisine)
    MealDBService.getRecipesByArea = function (area) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, detailedRecipes, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/filter.php?a=").concat(encodeURIComponent(area)))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch recipes by area");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!data || !Array.isArray(data.meals))
                            return [2 /*return*/, []];
                        return [4 /*yield*/, Promise.all(data.meals
                                .slice(0, 12)
                                .map(function (meal) { return _this.getRecipeById(meal.idMeal); }))];
                    case 3:
                        detailedRecipes = _a.sent();
                        return [2 /*return*/, detailedRecipes.filter(function (recipe) { return recipe !== null; })];
                    case 4:
                        error_6 = _a.sent();
                        console.error("Error fetching recipes by area:", error_6);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Get all categories
    MealDBService.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)("".concat(MEALDB_BASE_URL, "/categories.php"))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch categories");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data && Array.isArray(data.categories) ? data.categories : []];
                    case 3:
                        error_7 = _a.sent();
                        console.error("Error fetching categories:", error_7);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Convert MealDB recipe to our internal format
    MealDBService.convertToInternalFormat = function (mealDBRecipe) {
        // Extract ingredients and measurements
        var ingredients = [];
        for (var i = 1; i <= 20; i++) {
            var ingredient = mealDBRecipe["strIngredient".concat(i)];
            var measure = mealDBRecipe["strMeasure".concat(i)];
            if (ingredient && ingredient.trim()) {
                var fullIngredient = measure && measure.trim()
                    ? "".concat(measure.trim(), " ").concat(ingredient.trim())
                    : ingredient.trim();
                ingredients.push(fullIngredient);
            }
        }
        // Split instructions into steps
        var instructions = mealDBRecipe.strInstructions
            .split(/\r\n|\r|\n/)
            .filter(function (step) { return step.trim().length > 0; })
            .map(function (step) { return step.trim(); });
        // Extract tags
        var tags = mealDBRecipe.strTags
            ? mealDBRecipe.strTags.split(",").map(function (tag) { return tag.trim(); })
            : [];
        // Determine dietary restrictions based on ingredients and tags
        var dietary = [];
        var ingredientText = ingredients.join(" ").toLowerCase();
        var instructionText = mealDBRecipe.strInstructions.toLowerCase();
        if (!ingredientText.includes("meat") &&
            !ingredientText.includes("chicken") &&
            !ingredientText.includes("beef") &&
            !ingredientText.includes("pork") &&
            !ingredientText.includes("fish") &&
            !ingredientText.includes("seafood")) {
            dietary.push("vegetarian");
        }
        if (tags.some(function (tag) { return tag.toLowerCase().includes("vegan"); })) {
            dietary.push("vegan");
        }
        // Generate a description from the first part of instructions
        var description = mealDBRecipe.strInstructions.length > 150
            ? mealDBRecipe.strInstructions.substring(0, 150) + "..."
            : mealDBRecipe.strInstructions;
        return {
            id: mealDBRecipe.idMeal,
            title: mealDBRecipe.strMeal,
            description: description,
            image: mealDBRecipe.strMealThumb,
            category: mealDBRecipe.strCategory,
            dietary: dietary,
            prepTime: "15 mins", // MealDB doesn't provide prep time
            cookTime: "30 mins", // MealDB doesn't provide cook time
            servings: "4", // MealDB doesn't provide servings
            rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10, // Generate random rating between 3.5-5.5
            reviews: Math.floor(Math.random() * 200) + 50, // Generate random review count
            ingredients: ingredients,
            instructions: instructions,
            cuisine: mealDBRecipe.strArea,
            tags: tags,
        };
    };
    return MealDBService;
}());
exports.MealDBService = MealDBService;
