# Wimm - _Where Is My Money?_

Simple online wallet system built with `Laravel` and `Angular`.

## Running

```
$ cd src
$ docker-compose up
```

|     | port |
| --- | ---- |
| `api` | `8000` |
| `web` | `4200` |

## Development

Sometimes `docker` fails without any obvious reasons, resulting in all ports (even though published) not accessible from the host. Here is the manually way of starting the project with `ng serve` and `php artisan serve`:

```console
$ cd src/api/laradock
$ docker-compose up -d mysql workspace
```

Find the `id` of the `workspace` container:
``` console
$ docker ps

CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                                        NAMES
4a64f9f5e3be        laradock_workspace   "/sbin/my_init"          41 seconds ago      Up 35 seconds       0.0.0.0:2222->22/tcp, 0.0.0.0:8000->80/tcp   laradock_workspace_1
```

`bash` into the `workspace` container:
```console
$ docker exec -it 4a64f9f5e3be bash
```

Run `php artisan serve` on host `0.0.0.0`
```console
$ php artisan serve --host=0.0.0.0 --port=80
Laravel development server started: <http://0.0.0.0:8000
```

![](./docs/screenshots/laravel.png)

To start the `Angular` development server, run these on the _host_:

```console
$ cd src/web
$ ng serve
```

## Initializing

To initialize the database, navigate to `localhost:4200/app/profile/` and click on `Initialize database` and `Populate sample data`.

![](./docs/screenshots/debug.png)

## Screenshots

### Landing page

![](./docs/screenshots/landing-page.png)

### Dashboard

#### Balances

![](./docs/screenshots/dashboard-balances.png)

#### Expenses

![](./docs/screenshots/dashboard-expenses.png)

### Records

#### All records

![](./docs/screenshots/records-all.png)

##### Deleting record

![](./docs/screenshots/records-delete-prompt.png)

![](./docs/screenshots/records-deleting.png)

![](./docs/screenshots/records-deleted.png)

#### Add new record

![](./docs/screenshots/record-add.png)

![](./docs/screenshots/record-add-choose-date.png)

![](./docs/screenshots/record-add-prompt.png)

![](./docs/screenshots/record-adding.png)

![](./docs/screenshots/record-added.png)

##### Changing currency

![](./docs/screenshots/record-add-select-currency.png)

### Budgets

#### All daily budgets

![](./docs/screenshots/budgets-all.png)

##### Deleting budget

![](./docs/screenshots/budgets-delete.png)

![](./docs/screenshots/budgets-deleting.png)

![](./docs/screenshots/budgets-deleted.png)

##### Overlimit

![](./docs/screenshots/budget-overlimit.png)

#### Set new budget

![](./docs/screenshots/budget-add.png)

### Recurrences

#### All recurrences

![](./docs/screenshots/recurrences-all.png)

#### Overdue recurrence

![](./docs/screenshots/recurrence-overdue.png)

#### Renewing recurrence

![](./docs/screenshots/recurrence-update-prompt.png)

![](./docs/screenshots/recurrence-updating.png)

![](./docs/screenshots/recurrence-updated.png)

#### Recurring record of different currency

![](./docs/screenshots/recurrence-different-currency.png)

#### Add recurrence

![](./docs/screenshots/recurrence-add.png)

### Profile

![](./docs/screenshots/profile.png)

#### Change default currency

![](./docs/screenshots/profile-change-default-currency.png)

## Others

This project is made for my `TSE2231 Software Engineering Fundamentals` subject.