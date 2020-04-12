# AVILA TEK PROJECT

this repository contains a recruitment project for avila tek

## Backend development workflow

```
pipenv shell
pipenv install
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Frontend development workflow

```
npm install 
npm start
```

## API End Points

* Show all users
    ```
    GET: /api/users/
    ```
* Show all products
    ```
    GET: /api/products/
* Show one product
    ```
    GET: /api/products/<slug>/
    ```
* Show all categories
    ```
    GET: /api/categories/
* Show one categorie
    ```
    GET: /api/categories/<slug>/
    ```
* Show all favorites products per user
    ```
    GET: /api/favorites/
    ```
* Show all attributes
    ```
    GET: /api/attributes/
* Show all attributes with the value and product
    ```
    GET: /api/products-attributes/
* Add one product in the request user favorites products
    ```
    POST: /api/add-to-favorite/
* Remove one product in the request user favorites products
    ```
    POST: /api/remove-from-favorite/
    ```
