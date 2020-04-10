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
    /api/users/
    ```
* Show all products
    ```
    /api/products/
    ```
* Show all categories
    ```
    /api/categories/
    ```
* Show all favorites products per user
    ```
    /api/favorites/
    ```
* Show all attributes
    ```
    /api/attributes/
* Show all attributes with the value and product
    ```
    /api/products-attributes/
    ```
