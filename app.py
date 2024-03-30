import pandas as pd
from flask import Flask, request, jsonify
import pingouin as pg

app = Flask(__name__)

@app.route('/calculate_alpha', methods=['POST'])
def calculate_alpha():
    data = request.get_json()['data']

    df = pd.DataFrame(data)

    alpha_tuple = pg.cronbach_alpha(df)

    alpha_value = alpha_tuple[0]

    return jsonify({'result': alpha_value})

if __name__ == '__main__':
    app.run()