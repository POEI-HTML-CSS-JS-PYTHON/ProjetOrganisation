from .UserRouter import router as user_router
from .EvenementRouter import router as evenement_router
from .ReservationRouter import router as reservation_router

routes = [
    user_router,
    evenement_router,
    reservation_router
]
