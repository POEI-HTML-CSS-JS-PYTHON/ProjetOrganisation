from .UserRouter import router as user_router
from .reservation import router as reservation_router

routes = [
    user_router,
    reservation_router
]