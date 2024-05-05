from flask import Blueprint, request, make_response, jsonify
from ..model.user import User
from ..service.message_service import MessageService

message_bp = Blueprint('message', __name__, url_prefix="/message")

@message_bp.route('/get', methods=['GET'])
def get():
    bearer_token = request.headers.get('Authorization')
    token = bearer_token.split(" ")[1]
    user_id = None
    session_id = request.args.get('session_id')

    try:
        user_id = User.decode_auth_token(token)
    except Exception as e:
        responseObject = {
            'status': 'fail',
            'message': '401 Unauthorized.'
        }
        return make_response(jsonify(responseObject)), 401
    
    try:
        sessions = MessageService.get_messages(user_id, session_id)
        responseObject = {
            'status': 'success',
            'data': sessions
        }
        return make_response(jsonify(responseObject)), 200
    except Exception as e:
        responseObject = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 401
